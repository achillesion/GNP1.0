import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { WsAuthGuard } from '../../common/guards/ws-auth.guard';
import { ChatService } from './chat_message.service';

interface ChatMessageDto {
  senderId: string;
  receiverId: string;
  message: string;
}

@WebSocketGateway(1111, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatGateway');

  private clients = new Map<string, Socket>();

  constructor(private chatService: ChatService) {}

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('message')
  async handleMessage(client: Socket, payload: ChatMessageDto): Promise<void> {
    const message = await this.chatService.createChatMessage(
      client.handshake.query.sub as string,
      payload.receiverId,
      payload.message,
    );

    await this.chatService.updateChatProfile(
      client.handshake.query.sub as string,
      payload.receiverId,
      payload.message,
    );

    const receiverSocket = this.clients.get(payload.receiverId);
    client.emit('message', message);

    if (receiverSocket) {
      receiverSocket.emit('message', message);
    }
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('getChatProfiles')
  async handleGetChatProfiles(client: Socket): Promise<void> {
    const { sub } = client.handshake.query;
    const profiles = await this.chatService.getUserChatProfiles(sub as string);
    client.emit('chatProfiles', profiles);
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('getUserProfile')
  async handleGetUserProfile(client: Socket, userId: string): Promise<void> {
    const profile = await this.chatService.getUserProfile(userId);
    client.emit('userProfile', profile);
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('getChatHistory')
  async handleGetChatHistory(
    client: Socket,
    otherUserId: string,
  ): Promise<void> {
    const { sub } = client.handshake.query;
    const history = await this.chatService.getMessagesBetweenUsers(
      sub as string,
      otherUserId,
    );
    client.emit('chatHistory', history);
  }

  afterInit(server: Server) {
    this.logger.log('Socket Initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    const { sub } = client.handshake.query;
    if (sub) {
      this.clients.set(sub as string, client);
      this.logger.log(`Client connected: ${sub}`);
    } else {
      this.logger.warn('Client connected without sub');
    }
  }

  handleDisconnect(client: Socket) {
    const { sub } = client.handshake.query;
    if (sub) {
      this.clients.delete(sub as string);
      this.logger.log(`Client disconnected: ${sub}`);
    }
  }
}

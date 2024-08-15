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

interface ChatMessage {
  sender: string;
  receiver: string;
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

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: ChatMessage): void {
    const receiverSocket = this.clients.get(payload.receiver);

    client.emit('message', payload);

    if (receiverSocket) {
      receiverSocket.emit('message', payload);
    }
  }

  afterInit(server: Server) {
    this.logger.log('Init');
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

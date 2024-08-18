// /backend/src/chat/chat.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { ChatMessage } from '../../entities/chat-message.entity';
import { ChatProfile } from 'src/entities/chat-profile.entity';
import { UserChatProfileDto } from './dto/get-user-chat-profiles.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(ChatProfile)
    private chatProfileRepository: Repository<ChatProfile>,

    @InjectRepository(ChatMessage)
    private chatMessageRepository: Repository<ChatMessage>,
  ) {}

  private logger: Logger = new Logger('ChatGateway');

  async createChatMessage(
    senderId: string,
    receiverId: string,
    message: string,
    createdAt: string,
  ): Promise<ChatMessage> {
    const chatMessage = new ChatMessage();
    chatMessage.senderId = senderId;
    chatMessage.receiverId = receiverId;
    chatMessage.message = message;
    chatMessage.createdAt = new Date(createdAt);
    return this.chatMessageRepository.save(chatMessage);
  }

  async getMessagesBetweenUsers(
    user1Id: string,
    user2Id: string,
  ): Promise<ChatMessage[]> {
    return this.chatMessageRepository
      .createQueryBuilder('message')
      .where(
        '(message.senderId = :user1Id AND message.receiverId = :user2Id) OR (message.senderId = :user2Id AND message.receiverId = :user1Id)',
        { user1Id, user2Id },
      )
      .orderBy('message.createdAt', 'ASC')
      .getMany();
  }

  async getUserChatProfile(chatProfileId: string) {
    return this.chatProfileRepository.findOne({ where: { id: chatProfileId } });
  }

  async getUserProfile(userId: string) {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  async getUserChatProfiles(userId: string): Promise<UserChatProfileDto[]> {
    return this.chatProfileRepository
      .createQueryBuilder('profile')
      .where('(profile.user1Id = :userId OR profile.user2Id = :userId)', {
        userId,
      })
      .leftJoinAndSelect('profile.user1', 'user1')
      .leftJoinAndSelect('profile.user2', 'user2')
      .orderBy('profile.lastMessageDate', 'DESC')
      .getMany()
      .then((profiles) =>
        profiles.map((profile) => {
          const data = JSON.parse(JSON.stringify(profile));
          data.user = data.user1.id === userId ? data.user2 : data.user1;
          delete data.user1;
          delete data.user2;
          return data;
        }),
      );
  }

  async updateChatProfile(sender: string, receiver: string, message: string) {
    let chatProfile = await this.chatProfileRepository
      .createQueryBuilder('profile')
      .where(
        '(profile.user1Id = :sender AND profile.user2Id = :receiver) OR (profile.user1Id = :receiver AND profile.user2Id = :sender)',
        { sender, receiver },
      )
      .leftJoinAndSelect('profile.user1', 'user1')
      .leftJoinAndSelect('profile.user2', 'user2')
      .getOne()
      .then((profile) => {
        const data = JSON.parse(JSON.stringify(profile));
        data.user = data.user1.id === sender ? data.user2 : data.user1;
        delete data.user1;
        delete data.user2;
        return data;
      });

    if (!chatProfile) {
      chatProfile = new ChatProfile();
      chatProfile.user1 = await this.userRepository.findOne({
        where: { id: sender },
      });
      chatProfile.user2 = await this.userRepository.findOne({
        where: { id: receiver },
      });
    }

    chatProfile.lastMessage = message;
    chatProfile.lastMessageDate = new Date();

    return await this.chatProfileRepository.save(chatProfile);
  }
}

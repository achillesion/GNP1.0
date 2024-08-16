import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGateway } from './chat_message.gateway';
import { AuthModule } from '../auth/auth.module';
import { WsAuthGuard } from '../../common/guards/ws-auth.guard';
import { User } from '../../entities/user.entity';
import { ChatMessage } from '../../entities/chat-message.entity';
import { UserModule } from '../user/user.module';
import { ChatService } from './chat_message.service';
import { ChatProfile } from 'src/entities/chat-profile.entity';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forFeature([ChatMessage, ChatProfile, User]),
  ],
  providers: [ChatGateway, WsAuthGuard, ChatService],
})
export class ChatMessageModule {}

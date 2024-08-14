import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { AuthModule } from '../auth/auth.module';
import { WsAuthGuard } from '../../common/guards/ws-auth.guard';

@Module({
  imports: [AuthModule],
  providers: [ChatGateway, WsAuthGuard],
})
export class ChatModule {}

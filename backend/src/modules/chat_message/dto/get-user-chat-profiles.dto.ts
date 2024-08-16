import { User } from 'src/entities/user.entity';

export class UserChatProfileDto {
  user: User;
  id: string;
  lastMessage: string;
  lastMessageDate: Date;
}

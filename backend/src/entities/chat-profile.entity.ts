import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('chat_profiles')
export class ChatProfile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => User)
  user1: User;

  @ManyToOne(() => User)
  user2: User;

  @Column({ nullable: true })
  lastMessage: string;

  @Column({ nullable: true })
  lastMessageDate: Date;
}

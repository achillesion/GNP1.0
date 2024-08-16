import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('chat_messages')
export class ChatMessage extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'uuid', nullable: false })
  senderId: string;

  @Column({ type: 'uuid', nullable: false })
  receiverId: string;

  @ManyToOne(() => User, (user) => user.sentMessages)
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedMessages)
  receiver: User;
}

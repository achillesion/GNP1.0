import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('payments')
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, name: 'first_name' })
  firstName: string;

  @Column({ nullable: false, name: 'last_name' })
  lastName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, name: 'business_name' })
  businessName: string;

  @Column({ nullable: false })
  address: string;

  @Column({ unique: true, nullable: false })
  phone: string;

  @Column({ nullable: false })
  country: string;

  @Column({ nullable: false, name: 'zip_code' })
  zipCode: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  city: string;

  @OneToOne(() => User, (user) => user.payment)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

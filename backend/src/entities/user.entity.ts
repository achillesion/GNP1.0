import { Hangar } from './hangar.entity';
import { Aircraft } from './aircraft.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Reservation } from './reservation.entity';
import { Payment } from './payment.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true, name: 'financial_info' })
  financialInfo: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: true, nullable: false })
  phone: string;

  @Column({ nullable: false })
  country: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true, length: 1000, name: 'refresh_token' })
  refreshToken: string;

  @OneToOne(() => Payment, (payment) => payment.user)
  payment: Payment;

  @OneToMany(() => Aircraft, (aircraft) => aircraft.user)
  aircraft: Aircraft;

  @OneToMany(() => Hangar, (hangar) => hangar.user)
  hangar: Hangar;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation;
}

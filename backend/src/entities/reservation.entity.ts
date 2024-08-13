import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hangar } from './hangar.entity';
import { Aircraft } from './aircraft.entity';
import { Payment, Status } from '../common/types';
import { User } from './user.entity';

@Entity('reservations')
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, type: 'int' })
  price: number;

  @Column({ nullable: true, type: 'int', default: 20 })
  commission: number;

  @Column({ nullable: false, name: 'start_time' })
  startTime: Date;

  @Column({ nullable: false, name: 'end_time' })
  endTime: Date;

  @Column({ nullable: false, enum: Payment })
  payment: Payment;

  @Column({ nullable: false, enum: Status, default: Status.ACTIVE })
  status: Status;

  @ManyToOne(() => Hangar, (hangar) => hangar.reservation)
  @JoinColumn({ name: 'hangar_id' })
  hangar: Hangar;

  @ManyToOne(() => Aircraft, (aircraft) => aircraft.reservation)
  @JoinColumn({ name: 'aircraft_id' })
  aircraft: Aircraft;

  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

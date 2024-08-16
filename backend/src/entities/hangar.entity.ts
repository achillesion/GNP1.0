import { Aircraft } from './aircraft.entity';
import {
  BaseEntity,
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Reservation } from './reservation.entity';
import { Intagibles } from './intangibles.entity';
import { Airport } from './airport.entity';
import { AccessType } from './../common/types';

export enum Cameras {
  INTERIOR = 'Interior',
  EXTERIOR = 'Exterior',
  BOTH = 'Both',
  NONE = 'None',
}

@Entity('hangars')
export class Hangar extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  owner: string;

  @Column({ nullable: true })
  user_id: string;

  @Column({ nullable: false })
  photo: string;

  @Column({ nullable: false, default: 0 })
  rating: number;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  title: string;

  @Column({ type: 'numeric', nullable: true })
  @Check(`"width" >= 10 AND "width" <= 250`)
  width: number;

  @Column({ type: 'numeric', nullable: true })
  @Check(`"length" >= 10 AND "length" <= 250`)
  length: number;

  @Column({ type: 'numeric', nullable: true, name: 'door_width' })
  @Check(`"door_width" >= 10 AND "door_width" <= 250`)
  doorWidth: number;

  @Column({ type: 'numeric', nullable: true, name: 'door_height' })
  @Check(`"door_height" >= 1 AND "door_height" <= 50`)
  doorHeight: number;

  @Column({ nullable: true })
  heated: boolean;

  @Column({
    nullable: false,
    type: 'date',
    name: 'vacancy_start_date',
  })
  vacancyStartDate: Date;

  @Column({ nullable: false, type: 'date', name: 'vacancy_end_date' })
  vacancyEndDate: Date;

  @Column({
    nullable: true,
    type: 'date',
    name: 'block_off_start_date',
  })
  blockOffStartDate: Date;

  @Column({
    nullable: true,
    type: 'date',
    name: 'block_off_end_date',
  })
  blockOffEndDate: Date;

  @Column({ nullable: true, enum: AccessType, name: 'access_type' })
  accessType: AccessType;

  @Column({ nullable: true, name: 'living_quarters' })
  livingQuarters: string;

  @Column({ nullable: true })
  cameras: string;

  @OneToOne(() => Intagibles, (intagibles) => intagibles.hangar)
  intagibles: Intagibles;

  @OneToMany(() => Aircraft, (aircraft) => aircraft.hangar)
  aircrafts: Aircraft;

  @OneToMany(() => Reservation, (reservation) => reservation.hangar)
  reservation: Reservation;

  @ManyToOne(() => Airport, (airport) => airport.hangars)
  @JoinColumn({ name: 'airport_id' })
  airport: Airport;

  @ManyToOne(() => User, (user) => user.hangar)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

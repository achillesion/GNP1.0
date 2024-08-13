import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Hangar } from './hangar.entity';
import { Reservation } from './reservation.entity';
import { Airport } from './airport.entity';

@Entity('aircrafts')
export class Aircraft extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  wingspan: number;

  @Column({ nullable: true })
  height: number;

  @Column({ nullable: true })
  owner: string;

  @Column({ nullable: false, name: 'n_number' })
  nNumber: string;

  @Column({ nullable: false })
  make: string;

  @Column({ nullable: false, name: 'home_airport' })
  homeAirport: string;

  @Column({ nullable: false, unique: true })
  model: string;

  @Column({ nullable: true })
  year: number;

  @ManyToOne(() => User, (user) => user.aircraft)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Hangar, (hangar) => hangar.aircrafts)
  @JoinColumn({ name: 'hangar_id' })
  hangar: Hangar;

  @ManyToOne(() => Airport, (airport) => airport.aircrafts)
  @JoinColumn({ name: 'airport_id' })
  airport: Airport;

  @OneToMany(() => Reservation, (reservation) => reservation.aircraft)
  reservation: Reservation;
}

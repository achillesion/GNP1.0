import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hangar } from './hangar.entity';
import { Aircraft } from './aircraft.entity';

@Entity('airports')
export class Airport extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: false, unique: true })
  identifier: string;

  @OneToMany(() => Hangar, (hangar) => hangar.airport)
  hangars: Hangar;

  @OneToMany(() => Aircraft, (aircraft) => aircraft.airport)
  aircrafts: Aircraft;
}

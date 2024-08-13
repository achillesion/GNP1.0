import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hangar } from './hangar.entity';

@Entity('intagibles')
export class Intagibles extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'int' })
  dimensions: number;

  @Column({ nullable: false, type: 'varchar' })
  location: string;

  @OneToOne(() => Hangar, (hangar) => hangar.intagibles)
  @JoinColumn({ name: 'hangar_id' })
  hangar: Hangar;
}

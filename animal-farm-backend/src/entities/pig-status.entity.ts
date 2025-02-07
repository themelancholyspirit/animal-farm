import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum PigStatus {
  DEFAULT = 'default',
  HAPPY = 'happy',
  PUTIN = 'putin',
  ANGRY = 'angry',
}

@Entity()
export class PigStatusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    default: PigStatus.DEFAULT,
  })
  status: PigStatus;
} 
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  species: string;

  @Column()
  imageUrl: string;

  @Column({ default: 0 })
  thanksCount: number;

  @Column({ default: 0 })
  disgustCount: number;

  @Column({ nullable: true })
  quote: string;

  @Column({ type: 'simple-array', nullable: false })
  favoriteFoods: string[];
}
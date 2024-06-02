import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Factory } from '../../factories/entities/factory.entity';

@Entity()
export class Sprocket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  teeth: number;

  @Column()
  pitch_diameter: number;

  @Column()
  outside_diameter: number;

  @Column()
  pitch: number;

  @ManyToOne(() => Factory, factory => factory.sprockets)
  factory: Factory;
}
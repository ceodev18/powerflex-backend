import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Factory } from './factory.entity';
import { Sprocket } from 'src/sprockets/entities/sprocket.entity';

@Entity()
export class FactoryProduction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  time: Date;

  @ManyToOne(() => Factory, factory => factory.productions)
  factory: Factory;

  @ManyToOne(() => Sprocket, sprocket => sprocket.productions)
  sprocket: Sprocket;

  @Column()
  sprocket_production_actual: number;

  @Column()
  sprocket_production_goal: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

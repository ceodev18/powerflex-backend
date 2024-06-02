import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Sprocket } from '../../sprockets/entities/sprocket.entity';

@Entity()
export class Factory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb')
  chart_data: {
    sprocket_production_actual: number[],
    sprocket_production_goal: number[],
    time: number[]
  };

  @OneToMany(() => Sprocket, sprocket => sprocket.factory)
  sprockets: Sprocket[];
}
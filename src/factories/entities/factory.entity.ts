import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Sprocket } from '../../sprockets/entities/sprocket.entity';
import { FactoryProduction } from './factory-production.entity';

@Entity()
export class Factory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Sprocket, (sprocket) => sprocket.factory)
  sprockets: Sprocket[];

  @OneToMany(() => FactoryProduction, (production) => production.factory)
  productions: FactoryProduction[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

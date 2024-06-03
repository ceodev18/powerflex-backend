import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Factory } from '../../factories/entities/factory.entity';
import { FactoryProduction } from 'src/factories/entities/factory-production.entity';

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

  @OneToMany(() => FactoryProduction, production => production.sprocket)
  productions: FactoryProduction[];
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
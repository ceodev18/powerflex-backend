import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factory } from './entities/factory.entity';
import { CreateFactoryDto } from './dto/create-factory.dto';
import { FactoryProduction } from './entities/factory-production.entity';
import { Sprocket } from '../sprockets/entities/sprocket.entity';

@Injectable()
export class FactoriesService {
  constructor(
    @InjectRepository(Factory)
    private readonly factoryRepository: Repository<Factory>,
    @InjectRepository(FactoryProduction)
    private readonly factoryProductionRepository: Repository<FactoryProduction>,
  ) {}

  async findAll(): Promise<Factory[]> {
    return this.factoryRepository.find();
  }

  async findOne(id: number): Promise<Factory> {
    const factory = await this.factoryRepository.findOne({ where: { id: id } });
    if (!factory) {
      throw new NotFoundException('Factory not found');
    }
    return factory;
  }

  async create(createFactoryDto: CreateFactoryDto): Promise<Factory> {
    const factory = new Factory();
    factory.name = createFactoryDto.name;
    return this.factoryRepository.save(factory);
  }
  async findAllGroupedByFactory(): Promise<{ [factoryName: string]: any[] }> {
    const allFactoryProductions = await this.factoryProductionRepository.find({
      relations: ['factory'],
    });

    const groupedProductions: { [factoryName: string]: any[] } = {};

    allFactoryProductions.forEach((production) => {
      const { id, time, sprocket_production_actual, sprocket_production_goal } =
        production;
      const formattedProduction = {
        id,
        time: new Date(time).getTime(),
        sprocket_production_actual,
        sprocket_production_goal,
      };

      if (!groupedProductions[production.factory.name]) {
        groupedProductions[production.factory.name] = [];
      }
      groupedProductions[production.factory.name].push(formattedProduction);
    });

    return groupedProductions;
  }
  async findGroupedByFactoryById(id: number): Promise<any[]> {
    const factoryProductions = await this.factoryProductionRepository.find({
      where: { factory: { id } },
      relations: ['factory', 'sprocket'],
    });

    return factoryProductions.map((production) => ({
      id: production.id,
      time: production.time.getTime(),
      sprocketId: production.sprocket.id,
      sprocket_production_actual: production.sprocket_production_actual,
      sprocket_production_goal: production.sprocket_production_goal,
    }));
  }

  async findAllSprockets(): Promise<Sprocket[]> {
    const factories = await this.factoryRepository.find({
      relations: ['sprockets'],
    });
    const allSprockets: Sprocket[] = factories.flatMap(
      (factory) => factory.sprockets,
    );
    return allSprockets;
  }
}

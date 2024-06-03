import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factory } from './entities/factory.entity';
import { CreateFactoryDto } from './dto/create-factory.dto';

@Injectable()
export class FactoriesService {
  constructor(
    @InjectRepository(Factory)
    private readonly factoryRepository: Repository<Factory>,
  ) {}

  async findAll(): Promise<Factory[]> {
    return this.factoryRepository.find();
  }

  async findOne(id: number): Promise<Factory> {
    const factory = await this.factoryRepository.findOne({where:{ id: id } });
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
}
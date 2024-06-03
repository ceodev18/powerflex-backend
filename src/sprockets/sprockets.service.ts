import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sprocket } from './entities/sprocket.entity';
import { CreateSprocketDto } from './dto/create-sprocket.dto';
import { UpdateSprocketDto } from './dto/update-sprocket.dto';
import { Factory } from 'src/factories/entities/factory.entity';

@Injectable()
export class SprocketsService {
  constructor(
    @InjectRepository(Sprocket)
    private readonly sprocketRepository: Repository<Sprocket>,
    @InjectRepository(Factory)
    private readonly factoryRepository: Repository<Factory>,
  ) { }

  async findAll(): Promise<Sprocket[]> {
    return this.sprocketRepository.find();
  }

  async findOne(id: number): Promise<Sprocket> {
    const sprocket = await this.sprocketRepository.findOne({ where: { id: id } });;
    if (!sprocket) {
      throw new NotFoundException('Sprocket not found');
    }
    return sprocket;
  }

  async create(createSprocketDto: CreateSprocketDto): Promise<Sprocket> {

    const factory = await this.factoryRepository.findOne({
      where: {
        id: createSprocketDto.factoryId
      }
    });

    const sprocket = this.sprocketRepository.create({
      ...createSprocketDto,
      factory: factory // Asignar la fábrica al sprocket
    });
    return this.sprocketRepository.save(sprocket);
  }

  async update(id: number, updateSprocketDto: UpdateSprocketDto): Promise<Sprocket> {
    const sprocket = await this.sprocketRepository.findOne({
      where: {
        id: id
      }
    });
    Object.assign(sprocket, updateSprocketDto); // Actualiza el objeto Sprocket con los datos del DTO
    return this.sprocketRepository.save(sprocket);
  }
}
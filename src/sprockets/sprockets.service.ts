import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sprocket } from './entities/sprocket.entity';
import { CreateSprocketDto } from './dto/create-sprocket.dto';
import { UpdateSprocketDto } from './dto/update-sprocket.dto';

@Injectable()
export class SprocketsService {
  constructor(
    @InjectRepository(Sprocket)
    private readonly sprocketRepository: Repository<Sprocket>,
  ) {}

  async findAll(): Promise<Sprocket[]> {
    return this.sprocketRepository.find();
  }

  async findOne(id: number): Promise<Sprocket> {
    const sprocket = await this.sprocketRepository.findOne({where:{ id: id } });;
    if (!sprocket) {
      throw new NotFoundException('Sprocket not found');
    }
    return sprocket;
  }

  async create(createSprocketDto: CreateSprocketDto): Promise<Sprocket> {
    const sprocket = this.sprocketRepository.create(createSprocketDto);
    return this.sprocketRepository.save(sprocket);
  }

  async update(id: number, updateSprocketDto: UpdateSprocketDto): Promise<Sprocket> {
    const sprocket = await this.sprocketRepository.findOne({
      where: {
        id:id
      }
    });
    Object.assign(sprocket, updateSprocketDto); // Actualiza el objeto Sprocket con los datos del DTO
    return this.sprocketRepository.save(sprocket);
  }
}
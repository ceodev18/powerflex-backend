import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { FactoriesService } from './factories.service';
import { Factory } from './entities/factory.entity';
import { CreateFactoryDto } from './dto/create-factory.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('factories')
@Controller('factories')
export class FactoriesController {
  constructor(private readonly factoriesService: FactoriesService) {}

  @Get()
  findAll(): Promise<Factory[]> {
    return this.factoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Factory> {
    return this.factoriesService.findOne(id);
  }

  @Post()
  create(@Body() createFactoryDto: CreateFactoryDto): Promise<Factory> {
    return this.factoriesService.create(createFactoryDto);
  }
}
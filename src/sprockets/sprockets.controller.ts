import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { SprocketsService } from './sprockets.service';
import { CreateSprocketDto } from './dto/create-sprocket.dto';
import { UpdateSprocketDto } from './dto/update-sprocket.dto';
import { Sprocket } from './entities/sprocket.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sprockets')
@Controller('sprockets')
export class SprocketsController {
  constructor(private readonly sprocketsService: SprocketsService) {}

  @Get()
  findAll(): Promise<Sprocket[]> {
    return this.sprocketsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Sprocket> {
    const sprocket = this.sprocketsService.findOne(id);
    if (!sprocket) {
      throw new HttpException('Sprocket not found', HttpStatus.NOT_FOUND);
    }
    return sprocket;
  }

  @Post()
  create(@Body() createSprocketDto: CreateSprocketDto): Promise<Sprocket> {
    return this.sprocketsService.create(createSprocketDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateSprocketDto: UpdateSprocketDto): Promise<Sprocket> {
    return this.sprocketsService.update(id, updateSprocketDto);
  }
}
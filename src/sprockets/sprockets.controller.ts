import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { SprocketsService } from './sprockets.service';
import { CreateSprocketDto } from './dto/create-sprocket.dto';
import { UpdateSprocketDto } from './dto/update-sprocket.dto';
import { Sprocket } from './entities/sprocket.entity';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('sprockets')
@Controller('sprockets')
export class SprocketsController {
  constructor(private readonly sprocketsService: SprocketsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all sprockets' })
  @ApiResponse({
    status: 200,
    description: 'All Sprockets retrieved',
    type: Sprocket,
  })
  findAll(): Promise<Sprocket[]> {
    return this.sprocketsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find sprocket by Id' })
  @ApiParam({
    name: 'id',
    description: 'The unique ID of the Sprocket',
    type: Number,
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Sprocket by Id retrieved',
    type: Sprocket,
  })
  @ApiResponse({ status: 404, description: 'Not users found' })
  findOne(@Param('id') id: number): Promise<Sprocket> {
    const sprocket = this.sprocketsService.findOne(id);
    if (!sprocket) {
      throw new HttpException('Sprocket not found', HttpStatus.NOT_FOUND);
    }
    return sprocket;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new Sprocket' })
  @ApiResponse({
    status: 200,
    description: 'Sprocket created',
    type: Sprocket,
  })
  @ApiResponse({ status: 404, description: 'Factory not found' })
  create(@Body() createSprocketDto: CreateSprocketDto): Promise<Sprocket> {
    return this.sprocketsService.create(createSprocketDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Sprocket' })
  @ApiParam({
    name: 'id',
    description: 'The unique ID of the Sprocket',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Sprocket updated',
    type: Sprocket,
  })
  @ApiResponse({ status: 404, description: 'Sprocket not found' })
  update(
    @Param('id') id: number,
    @Body() updateSprocketDto: UpdateSprocketDto,
  ): Promise<Sprocket> {
    return this.sprocketsService.update(id, updateSprocketDto);
  }
}

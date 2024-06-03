import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { FactoriesService } from './factories.service';
import { Factory } from './entities/factory.entity';
import { CreateFactoryDto } from './dto/create-factory.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FactoryProduction } from './entities/factory-production.entity';
import { Sprocket } from '../sprockets/entities/sprocket.entity';

@ApiTags('factories')
@Controller('factories')
export class FactoriesController {
  constructor(private readonly factoriesService: FactoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all factories' })
  @ApiResponse({
    status: 200,
    description: 'All factories retrieved',
    type: Factory,
  })
  findAll(): Promise<Factory[]> {
    return this.factoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get factory by Id' })
  @ApiParam({
    name: 'id',
    description: 'The unique ID of the Factory',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Factory by Id retrieved',
    type: Factory,
  })
  @ApiResponse({ status: 404, description: 'Factory not found' })
  findOne(@Param('id') id: number): Promise<Factory> {
    return this.factoriesService.findOne(id);
  }

  @Post()
  create(@Body() createFactoryDto: CreateFactoryDto): Promise<Factory> {
    return this.factoriesService.create(createFactoryDto);
  }

  @Get('production/grouped/:id')
  @ApiOperation({ summary: 'Get production from a factory grouped by factory' })
  @ApiParam({ name: 'id', description: 'Factory ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Production retrieved and grouped by factory ID',
    type: Object,
  })
  async findGroupedByFactoryById(@Param('id') id: number): Promise<any[]> {
    return this.factoriesService.findGroupedByFactoryById(id);
  }

  @Get('production/grouped')
  @ApiOperation({
    summary: 'Get production from all factories grouped by factory',
  })
  @ApiResponse({
    status: 200,
    description: 'Production retrieved and grouped by all factories',
    type: Object,
  })
  async findAllGroupedByFactory(): Promise<{
    [factoryName: string]: FactoryProduction[];
  }> {
    return this.factoriesService.findAllGroupedByFactory();
  }

  @Get('sprockets')
  @ApiOperation({ summary: 'Get all sprockets related to factories' })
  @ApiResponse({
    status: 200,
    description: 'All sprockets related to factories retrieved',
    type: Sprocket,
    isArray: true,
  })
  async findAllSprockets(): Promise<Sprocket[]> {
    return this.factoriesService.findAllSprockets();
  }
}

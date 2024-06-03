import { Module } from '@nestjs/common';
import { FactoriesService } from './factories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FactoriesController } from './factories.controller';
import { Factory } from './entities/factory.entity';
import { FactoryProduction } from './entities/factory-production.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Factory, FactoryProduction])],
  providers: [FactoriesService],
  controllers: [FactoriesController]
})
export class FactoriesModule {}

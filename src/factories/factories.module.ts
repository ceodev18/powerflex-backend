import { Module } from '@nestjs/common';
import { FactoriesService } from './factories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FactoriesController } from './factories.controller';
import { Factory } from './entities/factory.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Factory])],
  providers: [FactoriesService],
  controllers: [FactoriesController]
})
export class FactoriesModule {}

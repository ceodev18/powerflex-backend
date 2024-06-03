import { Module } from '@nestjs/common';
import { SprocketsService } from './sprockets.service';
import { SprocketsController } from './sprockets.controller';
import { Sprocket } from './entities/sprocket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factory } from 'src/factories/entities/factory.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Sprocket, Factory])],
  providers: [SprocketsService],
  controllers: [SprocketsController]
})
export class SprocketsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { FactoriesModule } from './factories/factories.module';
import { SprocketsModule } from './sprockets/sprockets.module';
import { Factory } from './factories/entities/factory.entity';
import { Sprocket } from './sprockets/entities/sprocket.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'ep-twilight-queen-a4k7jtmc-pooler.us-east-1.aws.neon.tech',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'usedefaultr',
      password: process.env.DB_PASSWORD || 'C7sEyPpo4gKT',
      database: process.env.DB_DATABASE || 'verceldb',
      schema: "public",
      ssl:{
        rejectUnauthorized: false,
      },
      entities: [Factory, Sprocket],
      synchronize: true,
    }),
    FactoriesModule,
    SprocketsModule,
  ],
})
export class AppModule {}
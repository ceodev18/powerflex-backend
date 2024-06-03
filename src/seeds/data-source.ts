import { DataSource } from 'typeorm';
import { Factory } from '../factories/entities/factory.entity';
import { Sprocket } from '../sprockets/entities/sprocket.entity';
import { FactoryProduction } from '../factories/entities/factory-production.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host:
    process.env.DB_HOST ||
    'ep-twilight-queen-a4k7jtmc-pooler.us-east-1.aws.neon.tech',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'default',
  password: process.env.DB_PASSWORD || 'C7sEyPpo4gKT',
  database: process.env.DB_DATABASE || 'verceldb',
  entities: [Factory, Sprocket, FactoryProduction],
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
  logging: false,
});

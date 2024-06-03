import { Factory } from '../factories/entities/factory.entity';
import { Sprocket } from '../sprockets/entities/sprocket.entity';
import { FactoryProduction } from '../factories/entities/factory-production.entity';
import * as factoryData from './seed_factory_data.json';
import * as sprocketData from './seed_sprocket_types.json';
import { AppDataSource } from './data-source';

async function runSeed() {
  await AppDataSource.initialize();
  const factoryRepository = AppDataSource.getRepository(Factory);
  const sprocketRepository = AppDataSource.getRepository(Sprocket);
  const productionRepository = AppDataSource.getRepository(FactoryProduction);

  // Clear existing data in the correct order
  await productionRepository.delete({});
  await sprocketRepository.delete({});
  await factoryRepository.delete({});

  // Insert factories
  const savedFactories: Factory[] = [];
  for (let index = 0; index < factoryData.factories.length; index++) {
    const factory = factoryRepository.create();
    factory.name = `Factory ${index + 1}`;
    await factoryRepository.save(factory);
    savedFactories.push(factory);
  }

  // Insert sprockets
  const savedSprockets: Sprocket[] = [];
  for (let index = 0; index < sprocketData.sprockets.length; index++) {
    const sprocketEntry = sprocketData.sprockets[index];
    const sprocket = sprocketRepository.create(sprocketEntry);

    // Associate sprocket with a factory
    const factory = savedFactories[index % savedFactories.length];
    sprocket.factory = factory; // sprocket entity has a factory relationship

    await sprocketRepository.save(sprocket);
    savedSprockets.push(sprocket);
  }

  for (
    let factoryIndex = 0;
    factoryIndex < factoryData.factories.length;
    factoryIndex++
  ) {
    const factoryEntry = factoryData.factories[factoryIndex];
    const factory = savedFactories[factoryIndex];

    for (let i = 0; i < factoryEntry.factory.chart_data.time.length; i++) {
      const sprocket = savedSprockets[i % savedSprockets.length];
      const production = productionRepository.create({
        sprocket_production_actual:
          factoryEntry.factory.chart_data.sprocket_production_actual[i],
        sprocket_production_goal:
          factoryEntry.factory.chart_data.sprocket_production_goal[i],
        time: new Date(factoryEntry.factory.chart_data.time[i] * 1000),
        factory,
        sprocket, //  FactoryProduction entity has a sprocket relationship
      });
      await productionRepository.save(production);
    }
  }

  console.log('Seeding complete!');
  await AppDataSource.destroy();
}

runSeed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Seeding error', error);
    process.exit(1);
  });


import { createConnection } from 'typeorm';
import * as fs from 'fs';
import { Factory } from 'src/factories/entities/factory.entity';
import { Sprocket } from 'src/sprockets/entities/sprocket.entity';

async function seed() {
  const connection = await createConnection();

  // Leer los datos de las fábricas desde el archivo JSON
  const factoriesData = fs.readFileSync('seed_factory_data.json', 'utf8');
  const factories = JSON.parse(factoriesData).factories.map((factoryData: any) => ({
    chart_data: factoryData.factory.chart_data
  }));

  // Guardar las fábricas en la base de datos
  await connection.getRepository(Factory).save(factories);

  // Leer los datos de los sprockets desde el archivo JSON
  const sprocketsData = fs.readFileSync('seed_sprocket_types.json', 'utf8');
  const sprockets = JSON.parse(sprocketsData).sprockets.map((sprocketData: any) => ({
    teeth: sprocketData.teeth,
    pitch_diameter: sprocketData.pitch_diameter,
    outside_diameter: sprocketData.outside_diameter,
    pitch: sprocketData.pitch
  }));

  // Guardar los sprockets en la base de datos
  await connection.getRepository(Sprocket).save(sprockets);

  await connection.close();
}

seed().then(() => {
  console.log('Seed completed successfully.');
}).catch(error => {
  console.error('Error seeding database:', error);
});

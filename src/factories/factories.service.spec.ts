import { Test, TestingModule } from '@nestjs/testing';
import { FactoriesService } from './factories.service';
import { Repository } from 'typeorm';
import { Factory } from './entities/factory.entity';
import { FactoryProduction } from './entities/factory-production.entity';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Sprocket } from '../sprockets/entities/sprocket.entity';

describe('FactoriesService', () => {
  let service: FactoriesService;
  let factoryRepositoryMock: Repository<Factory>;
  let factoryProductionRepositoryMock: Repository<FactoryProduction>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FactoriesService,
        {
          provide: getRepositoryToken(Factory),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(FactoryProduction),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<FactoriesService>(FactoriesService);
    factoryRepositoryMock = module.get<Repository<Factory>>(
      getRepositoryToken(Factory),
    );
    factoryProductionRepositoryMock = module.get<Repository<FactoryProduction>>(
      getRepositoryToken(FactoryProduction),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all factories', async () => {
      const factories: Factory[] = [
        {
          id: 1,
          name: 'Factory 1',
          sprockets: [],
          productions: [],
          createdAt: undefined,
          updatedAt: undefined,
        },
      ];
      jest.spyOn(factoryRepositoryMock, 'find').mockResolvedValue(factories);

      expect(await service.findAll()).toEqual(factories);
    });
  });

  describe('findOne', () => {
    it('should return a factory by id', async () => {
      const factory: Factory = {
        id: 1,
        name: 'Factory 1',
        sprockets: [],
        productions: [],
        createdAt: undefined,
        updatedAt: undefined,
      };
      jest.spyOn(factoryRepositoryMock, 'findOne').mockResolvedValue(factory);

      expect(await service.findOne(1)).toEqual(factory);
    });

    it('should throw NotFoundException if factory not found', async () => {
      jest.spyOn(factoryRepositoryMock, 'findOne').mockResolvedValue(undefined);

      await expect(service.findOne(1)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new factory', async () => {
      const createFactoryDto = { name: 'New Factory' };
      const newFactory: Factory = {
        id: 1, name: 'New Factory',
        sprockets: [],
        productions: [],
        createdAt: undefined,
        updatedAt: undefined,
      };
      jest.spyOn(factoryRepositoryMock, 'save').mockResolvedValue(newFactory);

      expect(await service.create(createFactoryDto)).toEqual(newFactory);
    });
  });

  describe('findAllGroupedByFactory', () => {
    it('should return production grouped by factory', async () => {
      const factoryProductions: FactoryProduction[] = [
        {
          id: 1,
          time: new Date(),
          sprocket_production_actual: 10,
          sprocket_production_goal: 20,
          factory: {
            id: 1, name: 'Factory 1',
            sprockets: [],
            productions: [],
            createdAt: undefined,
            updatedAt: undefined,
          },
          sprocket: new Sprocket(),
          createdAt: undefined,
          updatedAt: undefined,
        },
        {
          id: 2,
          time: new Date(),
          sprocket_production_actual: 15,
          sprocket_production_goal: 25,
          factory: {
            id: 1, name: 'Factory 1',
            sprockets: [],
            productions: [],
            createdAt: undefined,
            updatedAt: undefined,
          },
          sprocket: new Sprocket(),
          createdAt: undefined,
          updatedAt: undefined
        },
      ];
      jest
        .spyOn(factoryProductionRepositoryMock, 'find')
        .mockResolvedValue(factoryProductions);

      const expectedGroupedProductions = {
        'Factory 1': [
          {
            id: 1,
            time: factoryProductions[0].time.getTime(),
            sprocket_production_actual: 10,
            sprocket_production_goal: 20,
          },
          {
            id: 2,
            time: factoryProductions[1].time.getTime(),
            sprocket_production_actual: 15,
            sprocket_production_goal: 25,
          },
        ]
      };

      expect(await service.findAllGroupedByFactory()).toEqual(
        expectedGroupedProductions,
      );
    });
  });

  describe('findGroupedByFactoryById', () => {
    it('should return production grouped by factory for given factory id', async () => {
      const factoryProductions: FactoryProduction[] = [
        {
          id: 1,
          time: new Date(),
          sprocket_production_actual: 10,
          sprocket_production_goal: 20,
          factory: {
            id: 1,
            name: 'Factory 1',
            sprockets: [],
            productions: [],
            createdAt: undefined,
            updatedAt: undefined,
          },
          sprocket: new Sprocket(),
          createdAt: undefined,
          updatedAt: undefined,
        },
        {
          id: 2,
          time: new Date(),
          sprocket_production_actual: 15,
          sprocket_production_goal: 25,
          factory: {
            id: 1, name: 'Factory 1',
            sprockets: [],
            productions: [],
            createdAt: undefined,
            updatedAt: undefined,
          },
          sprocket: new Sprocket(),
          createdAt: undefined,
          updatedAt: undefined,
        },
      ];
      jest
        .spyOn(factoryProductionRepositoryMock, 'find')
        .mockResolvedValue(factoryProductions);

      const expectedGroupedProductions = [
        {
          id: 1,
          time: factoryProductions[0].time.getTime(),
          sprocket_production_actual: 10,
          sprocket_production_goal: 20,
        },
        {
          id: 2,
          time: factoryProductions[1].time.getTime(),
          sprocket_production_actual: 15,
          sprocket_production_goal: 25,
        },
      ];

      expect(await service.findGroupedByFactoryById(1)).toEqual(
        expectedGroupedProductions,
      );
    });
  });

  describe('findAllSprockets', () => {
    it('should return all sprockets related to factories', async () => {
      const sprockets: Sprocket[] = [
        {
          id: 1,
          teeth: 25,
          pitch_diameter: 25,
          outside_diameter: 26,
          pitch: 21,
          factory: new Factory(),
          productions: [],
          createdAt: undefined,
          updatedAt: undefined,
        },
        {
          id: 2,
          teeth: 25,
          pitch_diameter: 25,
          outside_diameter: 26,
          pitch: 21,
          factory: new Factory(),
          productions: [],
          createdAt: undefined,
          updatedAt: undefined,
        },
      ];
      const factories: Factory[] = [
        {
          id: 1,
          name: 'Factory 1',
          sprockets: sprockets.slice(0, 1),
          productions: [],
          createdAt: undefined,
          updatedAt: undefined,
        },
        {
          id: 2,
          name: 'Factory 2',
          sprockets: sprockets.slice(1),
          productions: [],
          createdAt: undefined,
          updatedAt: undefined,
        },
      ];
      jest.spyOn(factoryRepositoryMock, 'find').mockResolvedValue(factories);

      expect(await service.findAllSprockets()).toEqual(sprockets);
    });
  });
});

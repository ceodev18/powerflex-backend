import { TestingModule, Test } from '@nestjs/testing';
import { Factory } from './entities/factory.entity';
import { FactoriesController } from './factories.controller';
import { FactoriesService } from './factories.service';

describe('FactoriesController', () => {
  let controller: FactoriesController;
  let service: FactoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FactoriesController],
      providers: [
        {
          provide: FactoriesService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            findAllGroupedByFactory: jest.fn(),
            findGroupedByFactoryById: jest.fn(),
            findAllSprockets: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FactoriesController>(FactoriesController);
    service = module.get<FactoriesService>(FactoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of factories', async () => {
      const factories: Factory[] = [
        {
          id: 1,
          name: 'Factory 1',
          sprockets: [],
          productions: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(factories);

      expect(await controller.findAll()).toEqual(factories);
    });
  });

  describe('findOne', () => {
    it('should return a factory by id', async () => {
      const factory: Factory = {
        id: 1,
        name: 'Factory 1',
        sprockets: [],
        productions: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(factory);

      expect(await controller.findOne(1)).toEqual(factory);
    });
  });

  describe('create', () => {
    it('should create a new factory', async () => {
      const createFactoryDto = { name: 'Factory 1', location: 'Location 1' };
      const factory: Factory = {
        id: 1,
        ...createFactoryDto,
        sprockets: [],
        productions: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'create').mockResolvedValue(factory);

      expect(await controller.create(createFactoryDto)).toEqual(factory);
    });
  });

  describe('findAllGroupedByFactory', () => {
    it('should return production grouped by factory', async () => {
      const groupedProductions = {
        Factory1: [
          {
            id: 1,
            time: 1611194818000,
            sprocket_production_actual: 32,
            sprocket_production_goal: 32,
          },
          {
            id: 2,
            time: 1611194819000,
            sprocket_production_actual: 30,
            sprocket_production_goal: 32,
          },
        ],
        Factory2: [
          {
            id: 3,
            time: 1611194820000,
            sprocket_production_actual: 25,
            sprocket_production_goal: 30,
          },
          {
            id: 4,
            time: 1611194821000,
            sprocket_production_actual: 28,
            sprocket_production_goal: 30,
          },
        ],
      };
      jest
        .spyOn(service, 'findAllGroupedByFactory')
        .mockResolvedValue(groupedProductions);

      expect(await controller.findAllGroupedByFactory()).toEqual(
        groupedProductions,
      );
    });
  });
});

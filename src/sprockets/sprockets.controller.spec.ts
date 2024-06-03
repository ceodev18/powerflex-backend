import { Test, TestingModule } from '@nestjs/testing';
import { SprocketsController } from './sprockets.controller';
import { SprocketsService } from './sprockets.service';
import { CreateSprocketDto } from './dto/create-sprocket.dto';
import { UpdateSprocketDto } from './dto/update-sprocket.dto';
import { Sprocket } from './entities/sprocket.entity';

describe('SprocketsController', () => {
  let controller: SprocketsController;
  let service: SprocketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SprocketsController],
      providers: [
        {
          provide: SprocketsService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SprocketsController>(SprocketsController);
    service = module.get<SprocketsService>(SprocketsService);
  });

  describe('findAll', () => {
    it('should return an array of sprockets', async () => {
      const result: Sprocket[] = [new Sprocket(), new Sprocket()];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);
      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single sprocket', async () => {
      const result = new Sprocket();
      jest.spyOn(service, 'findOne').mockResolvedValue(result);
      expect(await controller.findOne(1)).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a new sprocket', async () => {
      const result = new Sprocket();
      const createDto = new CreateSprocketDto();
      jest.spyOn(service, 'create').mockResolvedValue(result);
      expect(await controller.create(createDto)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a sprocket', async () => {
      const result = new Sprocket();
      const updateDto = new UpdateSprocketDto();
      jest.spyOn(service, 'update').mockResolvedValue(result);
      expect(await controller.update(1, updateDto)).toBe(result);
    });
  });
});

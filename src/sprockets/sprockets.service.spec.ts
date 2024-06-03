import { Test, TestingModule } from '@nestjs/testing';
import { SprocketsService } from './sprockets.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Sprocket } from './entities/sprocket.entity';
import { Factory } from '../factories/entities/factory.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateSprocketDto } from './dto/create-sprocket.dto';
import { UpdateSprocketDto } from './dto/update-sprocket.dto';

describe('SprocketsService', () => {
  let service: SprocketsService;
  let sprocketRepository: Repository<Sprocket>;
  let factoryRepository: Repository<Factory>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SprocketsService,
        {
          provide: getRepositoryToken(Sprocket),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Factory),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<SprocketsService>(SprocketsService);
    sprocketRepository = module.get<Repository<Sprocket>>(
      getRepositoryToken(Sprocket),
    );
    factoryRepository = module.get<Repository<Factory>>(
      getRepositoryToken(Factory),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of sprockets', async () => {
      const result = [{ id: 1, teeth: 10 } as Sprocket];
      jest.spyOn(sprocketRepository, 'find').mockResolvedValue(result);
      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a sprocket if found', async () => {
      const result = {
        id: 1,
        teeth: 5,
        pitch_diameter: 5,
        outside_diameter: 6,
        pitch: 1,
        factoryId: 2,
      } as unknown as Sprocket;
      jest.spyOn(sprocketRepository, 'findOne').mockResolvedValue(result);
      expect(await service.findOne(1)).toBe(result);
    });

    it('should throw a NotFoundException if no sprocket is found', async () => {
      jest.spyOn(sprocketRepository, 'findOne').mockResolvedValue(undefined);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return a sprocket', async () => {
      const factory = { id: 1, name: 'Factory 1' } as Factory;
      const createSprocketDto = {
        teeth: 10,
        pitchDiameter: 5,
        outsideDiameter: 6,
        pitch: 1,
        factoryId: 1,
      } as CreateSprocketDto;
      const result = {
        id: 1,
        ...createSprocketDto,
        factory,
      } as unknown as Sprocket;

      jest.spyOn(factoryRepository, 'findOne').mockResolvedValue(factory);
      jest.spyOn(sprocketRepository, 'create').mockReturnValue(result);
      jest.spyOn(sprocketRepository, 'save').mockResolvedValue(result);

      expect(await service.create(createSprocketDto)).toBe(result);
    });

    it('should throw a NotFoundException if no factory is found', async () => {
      const createSprocketDto = {
        teeth: 10,
        pitchDiameter: 5,
        outsideDiameter: 6,
        pitch: 1,
        factoryId: 1,
      } as CreateSprocketDto;

      jest.spyOn(factoryRepository, 'findOne').mockResolvedValue(undefined);
      await expect(service.create(createSprocketDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update and return the sprocket', async () => {
      const updateSprocketDto = { teeth: 12 } as UpdateSprocketDto;
      const existingSprocket = {
        id: 1,
        teeth: 5,
        pitch_diameter: 5,
        outside_diameter: 6,
        pitch: 1,
        factoryId: 2,
      } as unknown as Sprocket;
      const updatedSprocket = {
        ...existingSprocket,
        ...updateSprocketDto,
      } as Sprocket;

      jest
        .spyOn(sprocketRepository, 'findOne')
        .mockResolvedValue(existingSprocket);
      jest.spyOn(sprocketRepository, 'save').mockResolvedValue(updatedSprocket);

      expect(await service.update(1, updateSprocketDto)).toBe(updatedSprocket);
    });

    it('should throw a NotFoundException if no sprocket is found', async () => {
      const updateSprocketDto = { teeth: 12 } as UpdateSprocketDto;

      jest.spyOn(sprocketRepository, 'findOne').mockResolvedValue(undefined);
      await expect(service.update(1, updateSprocketDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});

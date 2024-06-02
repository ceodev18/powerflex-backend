import { Test, TestingModule } from '@nestjs/testing';
import { SprocketsController } from './sprockets.controller';

describe('SprocketsController', () => {
  let controller: SprocketsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SprocketsController],
    }).compile();

    controller = module.get<SprocketsController>(SprocketsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

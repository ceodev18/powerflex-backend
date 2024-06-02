import { Test, TestingModule } from '@nestjs/testing';
import { SprocketsService } from './sprockets.service';

describe('SprocketsService', () => {
  let service: SprocketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SprocketsService],
    }).compile();

    service = module.get<SprocketsService>(SprocketsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

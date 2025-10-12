import { Test, TestingModule } from '@nestjs/testing';
import { ClimateHistoryService } from './climate-history.service';

describe('ClimateHistoryService', () => {
  let service: ClimateHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClimateHistoryService],
    }).compile();

    service = module.get<ClimateHistoryService>(ClimateHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

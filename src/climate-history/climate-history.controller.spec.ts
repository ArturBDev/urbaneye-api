import { Test, TestingModule } from '@nestjs/testing';
import { ClimateHistoryController } from './climate-history.controller';
import { ClimateHistoryService } from './climate-history.service';

describe('ClimateHistoryController', () => {
  let controller: ClimateHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClimateHistoryController],
      providers: [ClimateHistoryService],
    }).compile();

    controller = module.get<ClimateHistoryController>(ClimateHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

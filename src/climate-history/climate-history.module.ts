import { Module } from '@nestjs/common';
import { ClimateHistoryService } from './climate-history.service';
import { ClimateHistoryController } from './climate-history.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ClimateHistoryController],
  providers: [ClimateHistoryService],
  imports: [PrismaModule],
})
export class ClimateHistoryModule {}

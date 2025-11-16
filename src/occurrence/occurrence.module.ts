import { Module } from '@nestjs/common';
import { OccurrenceService } from './occurrence.service';
import { OccurrenceController } from './occurrence.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OccurrenceSchedulerService } from './occurrence-scheduler.service';

@Module({
  controllers: [OccurrenceController],
  providers: [OccurrenceService, OccurrenceSchedulerService],
  imports: [PrismaModule],
})
export class OccurrenceModule {}

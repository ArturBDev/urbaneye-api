import { Module } from '@nestjs/common';
import { OccurrenceService } from './occurrence.service';
import { OccurrenceController } from './occurrence.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [OccurrenceController],
  providers: [OccurrenceService],
  imports: [PrismaModule],
})
export class OccurrenceModule {}

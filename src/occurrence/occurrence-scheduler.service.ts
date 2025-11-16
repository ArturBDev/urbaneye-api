import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OccurrenceService } from './occurrence.service';

const HOURS_TO_VALIDATE = 2.5;

@Injectable()
export class OccurrenceSchedulerService {
  private readonly logger = new Logger(OccurrenceSchedulerService.name);

  constructor(private readonly occurrenceService: OccurrenceService) {}

  // Every 30 seconds, validate occurrences based on number of interactions
  @Cron(CronExpression.EVERY_10_SECONDS)
  async validateOccurrences() {
    this.logger.log('Starting automatic occurrence validation...');

    try {
      const approvedOccurrences =
        await this.occurrenceService.findApprovedOlderThan(HOURS_TO_VALIDATE);

      this.logger.log(
        `Found ${approvedOccurrences.length} approved occurrences to validate`,
      );

      for (const occurrence of approvedOccurrences) {
        await this.occurrenceService.validatesOccurrenceBasedOnNumberOfInteractions(
          occurrence.id,
        );
      }
    } catch (error) {
      this.logger.error('Error during automatic validation', error);
    }
  }
}

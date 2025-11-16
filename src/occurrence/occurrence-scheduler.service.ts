import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OccurrenceService } from './occurrence.service';

const HOURS_TO_VALIDATE = 2.5;

/**
 * Every hour, validate occurrences based on number of interactions.
 * It validates occurrences that have been approved and are older than 2.5 hours.
 * It counts the number of support and dispute interactions in the last hour.
 * If the number of support interactions is greater than the number of dispute interactions, the occurrence is validated and keeps the status approved.
 * If the number of support interactions is less than the number of dispute interactions, the occurrence is closed.
 */

@Injectable()
export class OccurrenceSchedulerService {
  private readonly logger = new Logger(OccurrenceSchedulerService.name);

  constructor(private readonly occurrenceService: OccurrenceService) {}

  // Every 30 seconds, validate occurrences based on number of interactions
  @Cron(CronExpression.EVERY_HOUR)
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

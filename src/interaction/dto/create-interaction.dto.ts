import { InteractionType } from '@prisma/client';

export class CreateInteractionDto {
  type: InteractionType;
  userId: string;
  occurrenceId: string;
}

import { InteractionType } from '@prisma/client';

export class Interaction {
  type: InteractionType;
  createdAt: Date;
  userId: string;
  occurrenceId: string;
}

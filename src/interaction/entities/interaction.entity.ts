import { InteractionType } from '@prisma/client';

export class Interaction {
  id: string;
  type: InteractionType;
  createdAt: Date;
  userId: string;
  occurrenceId: string;
}

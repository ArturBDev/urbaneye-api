import { InteractionType, Occurrence, User } from '@prisma/client';

export class Interaction {
  id: string;
  type: InteractionType;
  createdAt: Date;
  userId: string;
  occurrenceId: string;
  user: User;
  occurrence: Occurrence;
}

import { Interaction } from 'src/interaction/entities/interaction.entity';
import { Occurrence } from 'src/occurrence/entities/occurrence.entity';
import { UserRole } from '@prisma/client';

export class User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
  occurrences: Occurrence[];
  interactions: Interaction[];
}

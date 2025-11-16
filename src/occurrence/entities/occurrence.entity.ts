import { OccurrenceStatus } from '@prisma/client';
import { User } from 'src/user/entities/user.entity';

export class Occurrence {
  id: string;
  title: string;
  description: string;
  status: OccurrenceStatus;
  imageUrl: string;
  latitude: number;
  longitude: number;
  address: string;
  userId: string;
  locationId: string;
}

import { OccurrenceStatus } from '@prisma/client';

export class CreateOccurrenceDto {
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  address: string;
  userId: string;
  locationId: string;
  status: OccurrenceStatus;
  imageUrl: string;
}

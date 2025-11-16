import { OccurrenceStatus } from '@prisma/client';

export class Occurrence {
  id: string;
  title: string;
  description: string;
  status: OccurrenceStatus;
  imageUrl: string;
  latitude: number;
  longitude: number;
  zipCode: string;
  country: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement: string;
  reference: string;
  address: string;
  userId: string;
  locationId: string;
}

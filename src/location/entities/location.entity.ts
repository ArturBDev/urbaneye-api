import { Occurrence } from '@prisma/client';

export class Location {
  id: string;
  name: string;
  neighborhood?: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  occurrences: Occurrence[];
}

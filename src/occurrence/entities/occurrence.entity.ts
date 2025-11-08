import { Alert } from 'src/alert/entities/alert.entity';
import { OccurrenceStatus } from '@prisma/client';
import { User } from 'src/user/entities/user.entity';
import { Location } from 'src/location/entities/location.entity';
import { Interaction } from 'src/interaction/entities/interaction.entity';

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
  user: User;
  location: Location;
  alerts: Alert[];
  interactions: Interaction[];
}

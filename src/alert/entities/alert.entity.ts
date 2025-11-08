import { AlertType, Occurrence } from '@prisma/client';
import { AlertLevel } from '@prisma/client';

export class Alert {
  id: string;
  title: string;
  description: string;
  type: AlertType;
  level: AlertLevel;
  issuedAt: Date;
  latitude: number;
  longitude: number;
  occurrenceId: string;
  occurrence: Occurrence;
}

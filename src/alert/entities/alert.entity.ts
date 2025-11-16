import { AlertType } from '@prisma/client';
import { AlertLevel } from '@prisma/client';

export class Alert {
  title: string;
  description: string;
  type: AlertType;
  level: AlertLevel;
  issuedAt: Date;
  latitude: number;
  longitude: number;
  occurrenceId: string;
}

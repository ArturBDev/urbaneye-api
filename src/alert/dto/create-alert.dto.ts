import { AlertType, AlertLevel } from '@prisma/client';

export class CreateAlertDto {
  title: string;
  description?: string;
  type: AlertType;
  level: AlertLevel;
  latitude?: number;
  longitude?: number;
  occurrenceId?: string;
}

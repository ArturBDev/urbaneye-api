import { ApiProperty } from '@nestjs/swagger';
import { AlertType } from '@prisma/client';
import { AlertLevel } from '@prisma/client';

export class Alert {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  type: AlertType;
  @ApiProperty()
  level: AlertLevel;
  @ApiProperty()
  issuedAt: Date;
  @ApiProperty()
  latitude: number;
  @ApiProperty()
  longitude: number;
  @ApiProperty()
  occurrenceId: string;
}

export class CreateClimateHistoryDto {
  date: Date;
  temperature: number;
  precipitation: number;
  humidity: number;
  wind: number;
  locationId: string;
}

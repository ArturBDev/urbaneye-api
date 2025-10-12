import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { OccurrenceModule } from './occurrence/occurrence.module';
import { AlertModule } from './alert/alert.module';
import { LocationModule } from './location/location.module';
import { ClimateHistoryModule } from './climate-history/climate-history.module';
import { FeedbackModule } from './feedback/feedback.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    UserModule,
    OccurrenceModule,
    AlertModule,
    LocationModule,
    ClimateHistoryModule,
    FeedbackModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

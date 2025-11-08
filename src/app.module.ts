import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { OccurrenceModule } from './occurrence/occurrence.module';
import { AlertModule } from './alert/alert.module';
import { LocationModule } from './location/location.module';
import { PrismaModule } from './prisma/prisma.module';
import { InteractionModule } from './interaction/interaction.module';

@Module({
  imports: [
    UserModule,
    OccurrenceModule,
    AlertModule,
    LocationModule,
    PrismaModule,
    InteractionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hangar } from '../../entities/hangar.entity';
import { HangarController } from './hangar.controller';
import { HangarService } from './hangar.service';
import { Airport } from '../../entities/airport.entity';
import { StorageService } from '../storage/storage.service';
import { UserModule } from '../user/user.module';
import { Reservation } from 'src/entities/reservation.entity';
import { StripeModule } from '../stripe/stripe.module';

@Module({
  imports: [
    UserModule,
    StripeModule,
    TypeOrmModule.forFeature([Hangar, Airport, Reservation]),
  ],
  controllers: [HangarController],
  providers: [HangarService, StorageService],
  exports: [HangarService],
})
export class HangarModule {}

import { Reservation } from 'src/entities/reservation.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { TokenService } from '../auth/token.service';
import { JwtService } from '@nestjs/jwt';
import { StorageService } from '../storage/storage.service';
import { UserModule } from '../user/user.module';
import { AircraftModule } from '../aircraft/aircraft.module';
import { HangarModule } from '../hangar/hangar.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]),
    AircraftModule,
    HangarModule,
    UserModule,
  ],
  controllers: [ReservationController],
  providers: [ReservationService, TokenService, JwtService, StorageService],
})
export class ReservationModule {}

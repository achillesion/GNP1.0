import { Module } from '@nestjs/common';
import { Aircraft } from '../../entities/aircraft.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AircraftController } from './aircraft.controller';
import { AircraftService } from './aircraft.service';
import { Airport } from '../../entities/airport.entity';
import { TokenService } from '../auth/token.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../../entities/user.entity';
import { StorageService } from '../storage/storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([Aircraft, Airport, User])],
  controllers: [AircraftController],
  providers: [
    AircraftService,
    TokenService,
    JwtService,
    UserService,
    StorageService,
  ],
  exports: [AircraftService],
})
export class AircraftModule {}

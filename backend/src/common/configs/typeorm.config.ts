import { ConfigService } from '@nestjs/config';
import { Aircraft } from '../../entities/aircraft.entity';
import { Airport } from '../../entities/airport.entity';
import { Hangar } from '../../entities/hangar.entity';
import { Intagibles } from '../../entities/intangibles.entity';
import { Reservation } from '../../entities/reservation.entity';
import { User } from '../../entities/user.entity';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Payment } from 'src/entities/payment.entity';
import { ChatMessage } from 'src/entities/chat-message.entity';
import { ChatProfile } from 'src/entities/chat-profile.entity';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  public constructor(private readonly configService: ConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mssql',
      host: this.configService.get('MSSQL_HOST'),
      port: +this.configService.get('MSSQL_PORT'),
      username: this.configService.get('MSSQL_USERNAME'),
      password: this.configService.get('MSSQL_PASSWORD'),
      database: this.configService.get('MSSQL_DATABASE'),
      synchronize: true,
      logging: false,
      entities: [
        User,
        Hangar,
        Aircraft,
        Reservation,
        Intagibles,
        Airport,
        Payment,
        ChatMessage,
        ChatProfile,
      ],
    };
  }
}

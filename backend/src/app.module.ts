import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { AircraftModule } from './modules/aircraft/aircraft.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { HangarModule } from './modules/hangar/hangar.module';
import { TypeOrmConfig } from './common/configs/typeorm.config';
import { ReservationModule } from './modules/reservation/reservation.module';
import { StorageModule } from './modules/storage/storage.module';
import { PaymentModule } from './modules/payment/payment.module';
import { StripeModule } from './modules/stripe/stripe.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useClass: TypeOrmConfig,
    }),
    AuthModule,
    UserModule,
    AircraftModule,
    HangarModule,
    ReservationModule,
    StorageModule,
    PaymentModule,
    StripeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

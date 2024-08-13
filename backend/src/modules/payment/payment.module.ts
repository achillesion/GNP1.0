import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from 'src/entities/payment.entity';
import { PaymentController } from './payment.controller';
import { TokenService } from '../auth/token.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Payment])],
  controllers: [PaymentController],
  providers: [PaymentService, TokenService, JwtService],
})
export class PaymentModule {}

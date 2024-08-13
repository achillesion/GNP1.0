import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Length } from 'class-validator';
import Stripe from 'stripe';

export class CreatePaymentMethodDto {
  @ApiProperty()
  @IsString()
  type: Stripe.PaymentMethodCreateParams.Type;

  @ApiProperty()
  @IsString()
  @Length(16)
  cardNumber: string;

  @ApiProperty()
  @IsNumber()
  expireMonth: number;

  @ApiProperty()
  @IsNumber()
  expireYear: number;

  @ApiProperty()
  @IsNumber()
  cvc: string;
}

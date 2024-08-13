import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import Stripe from 'stripe';

export class CreatePlanDto {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsString()
  currency: string;

  @ApiProperty()
  @IsString()
  productId: string;

  @ApiProperty()
  @IsString()
  interval: Stripe.PlanCreateParams.Interval;
}

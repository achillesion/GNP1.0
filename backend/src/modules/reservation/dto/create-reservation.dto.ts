import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber, IsUUID } from 'class-validator';
import { Payment } from '../../../common/types';

export class CreateReservationDto {
  @ApiProperty()
  @IsUUID()
  hangarId: string;

  @ApiProperty()
  @IsUUID()
  aircraftId: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsDateString()
  startTime: Date;

  @ApiProperty()
  @IsDateString()
  endTime: Date;

  @ApiProperty()
  @IsEnum(Payment)
  payment: Payment;
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSessionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  priceId: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  quantity: number;
}

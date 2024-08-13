import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreatePriceDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  unitAmount: number;

  @ApiProperty()
  @IsString()
  productName: string;
}

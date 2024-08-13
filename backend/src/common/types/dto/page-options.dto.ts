import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PageOptionsDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly identifier?: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  readonly vacancyStartDate?: Date;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  readonly vacancyEndDate?: Date;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  readonly blockOffStartDate?: Date;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  readonly blockOffEndDate?: Date;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  readonly from?: Date;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  readonly to?: Date;

  @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}

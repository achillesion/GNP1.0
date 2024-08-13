import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { AccessType } from '../../../common/types';
import { Transform, Type } from 'class-transformer';
import { Cameras } from 'src/entities/hangar.entity';

export class CreateHangarDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsOptional()
  @Min(10)
  @Max(50)
  @Type(() => Number)
  @IsNumber()
  doorHeight?: number;

  @ApiProperty()
  @IsOptional()
  @Min(10)
  @Max(250)
  @Type(() => Number)
  @IsNumber()
  doorWidth?: number;

  @ApiProperty()
  @IsOptional()
  @Min(1)
  @Max(250)
  @Type(() => Number)
  @IsNumber()
  length?: number;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => {
    return [true, 'true'].indexOf(value) > -1;
  })
  @IsBoolean()
  heated?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Cameras)
  cameras?: string;

  @ApiProperty()
  @IsOptional()
  @Min(10)
  @Max(250)
  @Type(() => Number)
  width?: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  depth?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  airportIdentifier: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(AccessType)
  accessType?: AccessType;

  @ApiProperty()
  @IsDateString()
  vacancyStartDate: Date;

  @ApiProperty()
  @IsDateString()
  vacancyEndDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  blockOffStartDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  blockOffEndDate?: Date;
}

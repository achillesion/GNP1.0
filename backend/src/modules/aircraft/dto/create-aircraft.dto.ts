import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAircraftDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  nNumber: string;

  @ApiProperty()
  @IsString()
  owner: string;

  @ApiProperty()
  @IsString()
  homeAirport: string;

  @ApiProperty()
  @IsString()
  model: string;

  @ApiProperty()
  @IsString()
  make: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  year: number;
}

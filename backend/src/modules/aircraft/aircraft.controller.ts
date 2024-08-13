import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AircraftService } from './aircraft.service';
import { CreateAircraftDto } from './dto/create-aircraft.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateAircraftDto } from './dto/update-aircraft.dto';
import { AuthGuard } from '../../common/guards/auth.guard';
import { Request } from 'express';
import { PageOptionsDto } from '../../common/types/dto/page-options.dto';
import { paginationSchema } from '../../common/swagger/schemas';

@ApiTags('aircrafts')
@Controller('aircrafts')
export class AircraftController {
  public constructor(private readonly aircraftService: AircraftService) {}

  @UseGuards(AuthGuard)
  @Post('/')
  public async createAircraft(
    @Body() createAircraftDto: CreateAircraftDto,
    @Req() req: Request,
  ) {
    const userId = req.user.sub;
    return this.aircraftService.createAircraft(createAircraftDto, userId);
  }

  @ApiResponse({ status: 200, schema: { example: paginationSchema } })
  @Get('/')
  public async getAircrafts(@Query() pageOptionsDto: PageOptionsDto) {
    return this.aircraftService.getAircrafts(pageOptionsDto);
  }

  @UseGuards(AuthGuard)
  @Get('/users')
  public async getAircraftsByUserId(
    @Query() pageOptionsDto: PageOptionsDto,
    @Req() req: Request,
  ) {
    const userId = req.user.sub;
    return this.aircraftService.getAircraftsByUserId(userId, pageOptionsDto);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  public async getAircraftById(@Param('id') id: string) {
    return this.aircraftService.getAircraftById(id);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  public async updateAircraftById(
    @Param('id') id: string,
    @Body() updates: UpdateAircraftDto,
  ) {
    return this.aircraftService.updateAircraftById(id, updates);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  public async deleteAircraftById(@Param('id') id: string) {
    return this.aircraftService.deleteAircraftById(id);
  }
}

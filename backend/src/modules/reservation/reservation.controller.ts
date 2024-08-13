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
import { ApiTags } from '@nestjs/swagger';
import { ReservationService } from './reservation.service';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { AuthGuard } from '../../common/guards/auth.guard';
import { PageOptionsDto } from '../../common/types/dto/page-options.dto';
import { Request } from 'express';

@ApiTags('reservations')
@Controller('reservations')
export class ReservationController {
  public constructor(private readonly reservationService: ReservationService) {}

  @UseGuards(AuthGuard)
  @Post('/')
  public async createReservation(
    @Body() createReservationDto: CreateReservationDto,
    @Req() req: Request,
  ) {
    const userId = req.user.sub;

    return this.reservationService.createReservation(
      createReservationDto,
      userId,
    );
  }

  @UseGuards(AuthGuard)
  @Get('/')
  public async getReservations(@Query() pageOptionsDto: PageOptionsDto) {
    return this.reservationService.getReservations(pageOptionsDto);
  }

  @UseGuards(AuthGuard)
  @Get('/users')
  public async getReservationsByUserId(
    @Query() pageOptionsDto: PageOptionsDto,
    @Req() req: Request,
  ) {
    const userId = req.user.sub;
    return this.reservationService.getReservationsByUserId(
      userId,
      pageOptionsDto,
    );
  }

  @UseGuards(AuthGuard)
  @Get('/myHangars')
  public async getAllReservationsForMyHangar(
    @Query() pageOptionsDto: PageOptionsDto,
    @Req() req: Request,
  ) {
    const userId = req.user.sub;
    return this.reservationService.getAllReservationsForMyHangar(
      userId,
      pageOptionsDto,
    );
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  public async getReservationById(@Param('id') id: string) {
    return this.reservationService.getReservationById(id);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  public async updateReservationById(
    @Param('id') id: string,
    @Body() updates: UpdateReservationDto,
  ) {
    return this.reservationService.updateReservationById(id, updates);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  public async deleteReservationById(@Param('id') id: string) {
    return this.reservationService.deleteReservationById(id);
  }
}

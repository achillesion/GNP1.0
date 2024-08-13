import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Reservation } from '../../entities/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EXCEPTION } from '../../common/constants/exception.constant';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { PageDto } from '../../common/types/dto/page.dto';
import { PageMetaDto } from '../../common/types/dto/page-meta.dto';
import { PageOptionsDto } from '../../common/types/dto/page-options.dto';
import { HangarService } from '../hangar/hangar.service';
import { AircraftService } from '../aircraft/aircraft.service';
import { UserService } from '../user/user.service';

@Injectable()
export class ReservationService {
  public constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    private readonly hangarService: HangarService,
    private readonly aircraftService: AircraftService,
    private readonly userService: UserService,
  ) {}

  public async createReservation(
    createReservationDto: CreateReservationDto,
    userId: string,
  ) {
    const aircraft = await this.aircraftService.getAircraftById(
      createReservationDto.aircraftId,
    );

    const hangar = await this.hangarService.getHangarById(
      createReservationDto.hangarId,
    );

    const user = await this.userService.getUserById(userId);

    if (
      (hangar.result.data.vacancyStartDate >=
        new Date(createReservationDto.startTime) &&
        hangar.result.data.vacancyEndDate <=
          new Date(createReservationDto.endTime)) ||
      (hangar.result.data.blockOffStartDate <=
        new Date(createReservationDto.endTime) &&
        hangar.result.data.blockOffEndDate >=
          new Date(createReservationDto.endTime))
    ) {
      throw new BadRequestException('Incorrect selected dates');
    }

    const entity = this.reservationRepository.create({
      ...createReservationDto,
      hangar: hangar.result.data,
      aircraft: aircraft.result.data,
      user: user.result.data,
    });

    await this.hangarService.updateHangarById(hangar.result.data.id, {
      blockOffStartDate: entity.startTime,
      blockOffEndDate: entity.endTime,
    });

    const result = await this.reservationRepository.save(entity);

    return {
      message: 'Reservation was created',
      result: {
        data: result,
      },
      statusCode: HttpStatus.CREATED,
    };
  }

  public async getReservations(pageOptionsDto: PageOptionsDto) {
    const [reservations, total] = await this.reservationRepository.findAndCount(
      {
        relations: {
          aircraft: true,
          hangar: true,
        },
        skip: pageOptionsDto.skip,
        take: pageOptionsDto.take,
        order: {
          price: pageOptionsDto.order,
        },
      },
    );

    const pageMetaDto = new PageMetaDto({
      itemCount: total,
      pageOptionsDto,
    });

    return {
      message: 'Reservations were fetched',
      result: new PageDto(reservations, pageMetaDto),
      statusCode: HttpStatus.OK,
    };
  }

  public async getAllReservationsForMyHangar(
    userId: string,
    pageOptionsDto: PageOptionsDto,
  ) {
    const hangars = await this.hangarService.getAllHangarsByUserId(userId);

    if (!hangars) {
      throw new NotFoundException('No hangars reservations found for the user');
    }

    const hangarIds = hangars.result.map((hangar) => hangar.id);

    const [reservations, total] = await this.reservationRepository.findAndCount(
      {
        where: {
          hangar: {
            id: In(hangarIds),
          },
        },
        relations: {
          aircraft: true,
          hangar: true,
          user: true,
        },
        skip: pageOptionsDto.skip,
        take: pageOptionsDto.take,
        order: {
          startTime: pageOptionsDto.order,
        },
      },
    );

    console.log();

    const pageMetaDto = new PageMetaDto({
      itemCount: total,
      pageOptionsDto,
    });

    return {
      message: 'Hangar reservations were fetched',
      result: new PageDto(reservations, pageMetaDto),
      statusCode: HttpStatus.OK,
    };
  }

  public async getReservationsByUserId(
    id: string,
    pageOptionsDto: PageOptionsDto,
  ) {
    const [reservations, total] = await this.reservationRepository.findAndCount(
      {
        where: {
          user: {
            id,
          },
        },
        relations: {
          aircraft: true,
          hangar: true,
        },
        skip: pageOptionsDto.skip,
        take: pageOptionsDto.take,
        order: {
          price: pageOptionsDto.order,
        },
      },
    );

    const pageMetaDto = new PageMetaDto({
      itemCount: total,
      pageOptionsDto,
    });

    return {
      message: 'Reservation was fetched',
      result: new PageDto(reservations, pageMetaDto),
      statusCode: HttpStatus.OK,
    };
  }

  public async getReservationById(id: string) {
    const reservation = await this.reservationRepository.findOne({
      where: {
        id,
      },
      relations: {
        aircraft: true,
        hangar: true,
      },
    });

    if (!reservation) {
      throw new NotFoundException(EXCEPTION.RESERVATION_NOT_FOUND);
    }

    return {
      message: 'Reservation was fetched',
      result: {
        data: reservation,
      },
      statusCode: HttpStatus.OK,
    };
  }

  public async updateReservationById(
    id: string,
    updates: UpdateReservationDto,
  ) {
    const hangar = await this.reservationRepository.findOneBy({ id });

    if (!hangar) {
      throw new NotFoundException(EXCEPTION.HANGAR_NOT_FOUND);
    }

    Object.assign(hangar, updates);

    const saved = await this.reservationRepository.save(hangar);

    return {
      message: 'Reservation was updated',
      result: {
        data: saved,
      },
      statusCode: HttpStatus.OK,
    };
  }

  public async deleteReservationById(id: string) {
    const reservation = await this.reservationRepository.findOneBy({ id });

    if (!reservation) {
      throw new NotFoundException(EXCEPTION.RESERVATION_NOT_FOUND);
    }

    await this.reservationRepository.delete(id);

    return {
      message: 'Reservation was deleted',
      result: null,
      statusCode: HttpStatus.ACCEPTED,
    };
  }
}

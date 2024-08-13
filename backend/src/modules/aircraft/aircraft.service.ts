import { InjectRepository } from '@nestjs/typeorm';
import { Aircraft } from './../../entities/aircraft.entity';
import { Repository } from 'typeorm';
import { CreateAircraftDto } from './dto/create-aircraft.dto';
import {
  BadRequestException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { EXCEPTION } from '../../common/constants/exception.constant';
import { UpdateAircraftDto } from './dto/update-aircraft.dto';
import { UserService } from '../user/user.service';
import { PageMetaDto } from '../../common/types/dto/page-meta.dto';
import { PageDto } from '../../common/types/dto/page.dto';
import { PageOptionsDto } from '../../common/types/dto/page-options.dto';

export class AircraftService {
  public constructor(
    @InjectRepository(Aircraft)
    private readonly aircraftRepository: Repository<Aircraft>,
    private readonly userService: UserService,
  ) {}

  public async createAircraft(
    createAircraftDto: CreateAircraftDto,
    id: string,
  ) {
    const aircraft = await this.getAircraftByModel(createAircraftDto.model);

    if (aircraft) {
      throw new BadRequestException(EXCEPTION.AIRCRAFT_ALREADY_EXISTS);
    }

    const user = await this.userService.getUserById(id);

    const entity = this.aircraftRepository.create({
      ...createAircraftDto,
      owner: user.result.data.name,
      user: user.result.data,
    });

    const result = await this.aircraftRepository.save(entity);

    return {
      message: 'Aircraft was created',
      result: {
        data: result,
      },
      statusCode: HttpStatus.CREATED,
    };
  }

  public async getAircrafts(pageOptionsDto: PageOptionsDto) {
    const [aircrafts, total] = await this.aircraftRepository.findAndCount({
      relations: {
        airport: true,
      },
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
      order: {
        name: pageOptionsDto.order,
      },
    });

    const pageMetaDto = new PageMetaDto({
      itemCount: total,
      pageOptionsDto,
    });

    return {
      message: 'Aircrafts were fetched',
      result: new PageDto(aircrafts, pageMetaDto),
      statusCode: HttpStatus.OK,
    };
  }

  public async getAircraftsByUserId(
    id: string,
    pageOptionsDto: PageOptionsDto,
  ) {
    const [aircrafts, total] = await this.aircraftRepository.findAndCount({
      where: {
        user: {
          id,
        },
      },
      relations: {
        airport: true,
      },
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
      order: {
        name: pageOptionsDto.order,
      },
    });

    const pageMetaDto = new PageMetaDto({
      itemCount: total,
      pageOptionsDto,
    });

    return {
      message: 'Aircrafts were fetched',
      result: new PageDto(aircrafts, pageMetaDto),
      statusCode: HttpStatus.OK,
    };
  }

  public async getAircraftById(id: string) {
    const aircraft = await this.aircraftRepository.findOneBy({ id });

    if (!aircraft) {
      throw new NotFoundException(EXCEPTION.AIRCRAFT_NOT_FOUND);
    }

    return {
      message: 'Aircraft was fetched',
      result: {
        data: aircraft,
      },
      statusCode: HttpStatus.OK,
    };
  }

  public async updateAircraftById(id: string, updates: UpdateAircraftDto) {
    const aircraft = await this.aircraftRepository.findOneBy({ id });

    if (!aircraft) {
      throw new NotFoundException(EXCEPTION.AIRCRAFT_NOT_FOUND);
    }

    Object.assign(aircraft, updates);

    const result = await this.aircraftRepository.save(aircraft);

    return {
      message: 'Aircraft was updated',
      result: {
        data: result,
      },
      statusCode: HttpStatus.OK,
    };
  }

  public async deleteAircraftById(id: string) {
    const aircraft = await this.aircraftRepository.findOneBy({ id });

    if (!aircraft) {
      throw new NotFoundException(EXCEPTION.AIRCRAFT_NOT_FOUND);
    }

    await this.aircraftRepository.delete(id);

    return {
      message: 'Aircraft was deleted',
      result: null,
      statusCode: HttpStatus.ACCEPTED,
    };
  }

  public async getAircraftByModel(model: string): Promise<Aircraft> {
    return this.aircraftRepository.findOneBy({ model });
  }
}

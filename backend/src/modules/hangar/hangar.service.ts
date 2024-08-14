import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hangar } from '../../entities/hangar.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateHangarDto } from './dto/create-hangar.dto';
import { EXCEPTION } from '../../common/constants/exception.constant';
import { UpdateHangarDto } from './dto/update-hangar.dto';
import { ServerResponse } from '../../common/types';
import { Airport } from '../../entities/airport.entity';
import { UserService } from '../user/user.service';
import { PageMetaDto } from '../../common/types/dto/page-meta.dto';
import { PageDto } from '../../common/types/dto/page.dto';
import { PageOptionsDto } from '../../common/types/dto/page-options.dto';
import { StorageService } from '../storage/storage.service';
import { ConfigService } from '@nestjs/config';
import { CryptoUtil } from 'src/common/utils/crypto.util';
import { Reservation } from 'src/entities/reservation.entity';
import { extname } from 'node:path';

@Injectable()
export class HangarService {
  public constructor(
    @InjectRepository(Hangar)
    private readonly hangarRepository: Repository<Hangar>,
    @InjectRepository(Airport)
    private readonly airportRepository: Repository<Airport>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    private readonly userService: UserService,
    private readonly storageService: StorageService,
    private readonly configService: ConfigService,
  ) {}

  public async createHangar(
    createHangarDto: CreateHangarDto,
    id: string,
    file: Express.Multer.File,
  ) {
    let airport = await this.airportRepository.findOneBy({
      identifier: createHangarDto.airportIdentifier,
    });

    if (!airport) {
      airport = await this.airportRepository.save({
        identifier: createHangarDto.airportIdentifier,
      });
    }

    const user = await this.userService.getUserById(id);

    const storageUrl = await this.storageService.upload(
      'images',
      file.buffer,
      `${CryptoUtil.generateUUID()}${extname(file.originalname)}`,
    );

    const url = storageUrl.replace(
      `https://${this.configService.get('AZURE_ACCOUNT')}.blob.core.windows.net/`,
      '',
    );

    const newHangar = {
      ...createHangarDto,
      vacancyStartDate: new Date(createHangarDto.vacancyStartDate),
      vacancyEndDate: new Date(createHangarDto.vacancyEndDate),
      ...(createHangarDto.blockOffStartDate && {
        blockOffStartDate: new Date(createHangarDto.blockOffStartDate),
      }),
      ...(createHangarDto.blockOffEndDate && {
        blockOffEndDate: new Date(createHangarDto.blockOffEndDate),
      }),
      airport,
      photo: url,
      owner: user.result.data.name,
      ownerId: user.result.data.id,
      user: user.result.data,
    };
    const entity = this.hangarRepository.create(newHangar);

    const hangar = await this.hangarRepository.save({
      ...entity,
    });

    return {
      message: 'Hangar was created',
      result: {
        data: hangar,
      },
      statusCode: HttpStatus.CREATED,
    };
  }

  public async getHangars(
    pageOptionsDto: PageOptionsDto,
  ): Promise<ServerResponse<PageDto<Hangar>>> {
    const whereClause = {};

    if (pageOptionsDto.identifier) {
      whereClause['airport'] = {
        identifier: pageOptionsDto.identifier,
      };
    }

    if (pageOptionsDto.vacancyStartDate && pageOptionsDto.vacancyEndDate) {
      whereClause['vacancyStartDate'] = pageOptionsDto.vacancyStartDate;
      whereClause['vacancyEndDate'] = pageOptionsDto.vacancyEndDate;
    }

    if (pageOptionsDto.blockOffStartDate && pageOptionsDto.blockOffEndDate) {
      whereClause['blockOffStartDate'] = pageOptionsDto.blockOffStartDate;
      whereClause['blockOffEndDate'] = pageOptionsDto.blockOffEndDate;
    }

    if (pageOptionsDto.from) {
      whereClause['vacancyStartDate'] = LessThanOrEqual(pageOptionsDto.from);
    }

    if (pageOptionsDto.to) {
      whereClause['vacancyEndDate'] = MoreThanOrEqual(pageOptionsDto.to);
    }

    const [hangars, total] = await this.hangarRepository.findAndCount({
      where: whereClause,
      relations: {
        airport: true,
        intagibles: true,
      },
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
      order: {
        title: pageOptionsDto.order,
      },
    });

    const pageMetaDto = new PageMetaDto({
      itemCount: total,
      pageOptionsDto,
    });

    return {
      message: 'Hangars were fetched',
      result: new PageDto(hangars, pageMetaDto),
      statusCode: HttpStatus.OK,
    };
  }

  public async getHangarsByUserId(id: string, pageOptionsDto: PageOptionsDto) {
    const [hangars, total] = await this.hangarRepository.findAndCount({
      where: {
        user: {
          id,
        },
      },
      relations: {
        airport: true,
        intagibles: true,
      },
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
      order: {
        title: pageOptionsDto.order,
      },
    });

    const pageMetaDto = new PageMetaDto({
      itemCount: total,
      pageOptionsDto,
    });

    return {
      message: 'Hangars were fetched',
      result: new PageDto(hangars, pageMetaDto),
      statusCode: HttpStatus.OK,
    };
  }

  public async getHangarById(id: string) {
    const hangar = await this.hangarRepository.findOne({
      where: {
        id,
      },
      relations: {
        airport: true,
        intagibles: true,
      },
    });

    if (!hangar) {
      throw new NotFoundException(EXCEPTION.HANGAR_NOT_FOUND);
    }

    return {
      message: 'Hangar was fetched',
      result: {
        data: hangar,
      },
      statusCode: HttpStatus.OK,
    };
  }

  public async getAllHangarsByUserId(id: string) {
    const hangars = await this.hangarRepository.find({
      where: {
        user: {
          id,
        },
      },
      relations: {
        airport: true,
        intagibles: true,
      },
      order: {
        title: 'ASC',
      },
    });

    if (!hangars || hangars.length === 0) {
      throw new NotFoundException('No hangars found for the user');
    }

    return {
      message: 'Hangars were fetched',
      result: hangars,
      statusCode: HttpStatus.OK,
    };
  }

  public async updateAvatar(id: string, photo: string) {
    const hangar = await this.hangarRepository.findOne({
      where: {
        id,
      },
      relations: {
        airport: true,
      },
    });

    if (!hangar) {
      throw new NotFoundException(EXCEPTION.HANGAR_NOT_FOUND);
    }

    Object.assign(hangar, {
      photo,
    });

    const saved = await this.hangarRepository.save(hangar);

    return {
      message: 'Hangar was updated',
      result: {
        data: saved,
      },
      statusCode: HttpStatus.OK,
    };
  }

  public async updateHangarById(id: string, updates: UpdateHangarDto) {
    const hangar = await this.hangarRepository.findOne({
      where: {
        id,
      },
      relations: {
        airport: true,
      },
    });

    if (!hangar) {
      throw new NotFoundException(EXCEPTION.HANGAR_NOT_FOUND);
    }

    let airport = await this.airportRepository.findOne({
      where: {
        identifier: updates.airportIdentifier,
      },
    });

    if (!airport) {
      airport = await this.airportRepository.save({
        identifier: updates.airportIdentifier,
      });
    }

    const entity = this.hangarRepository.create({
      ...updates,
      airport,
    });

    Object.assign(hangar, entity);

    const saved = await this.hangarRepository.save(hangar);

    return {
      message: 'Hangar was updated',
      result: {
        data: saved,
      },
      statusCode: HttpStatus.OK,
    };
  }

  public async uploadFile(id: string, file: Express.Multer.File) {
    const storageUrl = await this.storageService.upload(
      'images',
      file.buffer,
      `${CryptoUtil.generateUUID()}${extname(file.originalname)}`,
    );

    const url = storageUrl.replace(
      `https://${this.configService.get('AZURE_ACCOUNT')}.blob.core.windows.net/`,
      '',
    );

    return this.updateAvatar(id, url);
  }

  public async deleteHangarById(id: string) {
    const hangar = await this.hangarRepository.findOneBy({ id });

    if (!hangar) {
      throw new NotFoundException(EXCEPTION.HANGAR_NOT_FOUND);
    }

    const reservation = await this.reservationRepository.findOne({
      where: {
        hangar,
      },
    });

    if (reservation) {
      throw new BadRequestException(
        'The hangar has not been removed, it is booked.',
      );
    }

    await this.hangarRepository.delete(id);

    return {
      message: 'Hangar was deleted',
      result: null,
      statusCode: HttpStatus.OK,
    };
  }
}

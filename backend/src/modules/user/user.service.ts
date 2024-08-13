import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { EXCEPTION } from '../../common/constants/exception.constant';
import { UpdateUserDto } from './dto/update-user.dto';
import { CryptoUtil } from '../../common/utils/crypto.util';
import { StorageService } from '../storage/storage.service';
import { ConfigService } from '@nestjs/config';
import { extname } from 'node:path';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly storageService: StorageService,
    private readonly configService: ConfigService,
  ) {}

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save(createUserDto);
  }

  public async getUsers() {
    const users = await this.userRepository.find({
      select: {
        id: true,
        name: true,
        avatar: true,
        financialInfo: true,
        email: true,
        phone: true,
        country: true,
        state: true,
        city: true,
      },
    });

    return {
      message: 'Users were fetched',
      result: {
        data: users,
      },
      statusCode: HttpStatus.OK,
    };
  }

  public async uploadFile(file: Express.Multer.File, userId: string) {
    const storageUrl = await this.storageService.upload(
      'images',
      file.buffer,
      `${userId}${extname(file.originalname)}`,
    );

    const url = storageUrl.replace(
      `https://${this.configService.get('AZURE_ACCOUNT')}.blob.core.windows.net/`,
      '',
    );

    await this.updateAvatar(userId, url);

    return {
      message: 'Image was uploaded',
      result: {
        data: url,
      },
      statusCode: HttpStatus.CREATED,
    };
  }

  public async getUserById(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        avatar: true,
        financialInfo: true,
        email: true,
        phone: true,
        country: true,
        state: true,
        city: true,
      },
    });

    if (!user) {
      throw new NotFoundException(EXCEPTION.USER_NOT_FOUND);
    }

    return {
      message: 'User was fetched',
      result: {
        data: user,
      },
      statusCode: HttpStatus.OK,
    };
  }

  public async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  public async getUserByPhone(phoneNumber: string): Promise<User> {
    return this.userRepository.findOneBy({ phone: phoneNumber });
  }

  public async updateUserById(id: string, updates: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(EXCEPTION.USER_NOT_FOUND);
    }

    const decrypted = await CryptoUtil.decrypt(user.password);

    if (decrypted !== updates.password) {
      throw new BadRequestException(EXCEPTION.PASSWORD_INVALID);
    }

    let hashedPassword: string;

    if (updates.newPassword) {
      hashedPassword = CryptoUtil.encrypt(updates.newPassword);
    }

    Object.assign(user, {
      ...updates,
      password: hashedPassword,
    });

    const updatedUser = await this.userRepository.save(user);

    const foundUser = await this.getUserById(updatedUser.id);

    return {
      message: 'User was updated',
      result: {
        data: {
          user: foundUser.result.data,
        },
      },
      statusCode: HttpStatus.OK,
    };
  }

  public async updateRefreshToken(id: string, refresh: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(EXCEPTION.USER_NOT_FOUND);
    }

    Object.assign(user, {
      refreshToken: refresh,
    });

    await this.userRepository.save(user);
  }

  public async updateAvatar(id: string, avatar: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(EXCEPTION.USER_NOT_FOUND);
    }

    Object.assign(user, {
      avatar,
    });

    await this.userRepository.save(user);
  }
}

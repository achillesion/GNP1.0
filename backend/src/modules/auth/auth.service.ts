import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './interfaces/dto/login-user.dto';
import { CryptoUtil } from '../../common/utils/crypto.util';
import { EXCEPTION } from '../../common/constants/exception.constant';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { TokenService } from './token.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { TokenType } from 'src/common/types/enums/token-type.enum';

@Injectable()
export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  public async signUp(createUserDto: CreateUserDto) {
    const userByEmail = await this.userService.getUserByEmail(
      createUserDto.email,
    );

    const userByPhone = await this.userService.getUserByPhone(
      createUserDto.phone,
    );

    if (userByEmail || userByPhone) {
      throw new BadRequestException(EXCEPTION.USER_ALREADY_EXISTS);
    }

    const encrypted = await CryptoUtil.encrypt(createUserDto.password);

    const createdUser = await this.userService.createUser({
      ...createUserDto,
      password: encrypted,
    });

    const payload: JwtPayload = {
      sub: createdUser.id,
      email: createdUser.email,
      name: createdUser.name,
    };

    const tokens = await this.tokenService.generateTokens(payload);

    await this.tokenService.updateRefreshToken(
      createdUser.id,
      tokens.refreshToken,
    );

    const foundUser = await this.userService.getUserById(createdUser.id);

    return {
      message: 'You are registered',
      result: {
        data: {
          tokens,
          user: foundUser.result.data,
        },
      },
      statusCode: HttpStatus.CREATED,
    };
  }

  public async signIn(loginUserDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(loginUserDto.email);

    if (!user) {
      throw new BadRequestException(EXCEPTION.USER_NOT_FOUND);
    }

    const decrypted = CryptoUtil.decrypt(user.password);

    if (decrypted !== loginUserDto.password) {
      throw new ForbiddenException(EXCEPTION.INVALID_CREDENTIALS);
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const tokens = await this.tokenService.generateTokens(payload);

    await this.tokenService.updateRefreshToken(user.id, tokens.refreshToken);

    const foundUser = await this.userService.getUserById(user.id);

    return {
      message: 'You are logged in',
      result: {
        data: {
          tokens,
          user: foundUser.result.data,
        },
      },
      statusCode: HttpStatus.OK,
    };
  }

  public async refreshToken(token: string, type: TokenType) {
    const validate = await this.tokenService
      .validateToken(token, type)
      .catch((error) => {
        throw new UnauthorizedException(error.message);
      });

    const user = await this.userService.getUserByEmail(validate.email);

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException(EXCEPTION.INVALID_CREDENTIALS);
    }

    const decrypted = await CryptoUtil.decrypt(user.refreshToken);

    if (decrypted !== token) {
      throw new UnauthorizedException(EXCEPTION.INVALID_TOKEN);
    }

    const payload: JwtPayload = {
      sub: user.id,
      name: user.name,
      email: user.email,
    };

    const tokens = await this.tokenService.generateTokens(payload);

    await this.tokenService.updateRefreshToken(user.id, tokens.refreshToken);

    const foundUser = await this.userService.getUserById(user.id);

    return {
      message: 'Refresh token was updated',
      result: {
        data: {
          tokens,
          user: foundUser.result.data,
        },
      },
      statusCode: HttpStatus.OK,
    };
  }
}

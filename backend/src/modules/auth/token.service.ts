import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { CryptoUtil } from '../../common/utils/crypto.util';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Token } from './interfaces/token.interface';
import { TokenType } from 'src/common/types/enums/token-type.enum';

@Injectable()
export class TokenService {
  private accessJwtSecret: string;
  private refreshJwtSecret: string;

  public constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    this.accessJwtSecret = this.configService.get('ACCESS_JWT_SECRET');
    this.refreshJwtSecret = this.configService.get('REFRESH_JWT_SECRET');
  }

  public async generateTokens(payload: JwtPayload): Promise<Token> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.accessJwtSecret,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.refreshJwtSecret,
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  public async updateRefreshToken(id: string, refresh: string): Promise<void> {
    const hashedRefreshToken = CryptoUtil.encrypt(refresh);
    await this.userService.updateRefreshToken(id, hashedRefreshToken);
  }

  public async validateToken(
    token: string,
    type: TokenType,
  ): Promise<JwtPayload> {
    const secret =
      type === TokenType.ACESSS ? this.accessJwtSecret : this.refreshJwtSecret;

    return this.jwtService.verifyAsync(token, {
      secret: secret,
    });
  }
}

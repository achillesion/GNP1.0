import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { TokenService } from '../../modules/auth/token.service';
import { TokenType } from 'src/common/types/enums/token-type.enum';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const client: Socket = context.switchToWs().getClient();
    const token = client.handshake.headers.authorization?.replace(
      'Bearer ',
      '',
    );

    if (!token) {
      return false;
    }

    return this.validateToken(token);
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      const payload = await this.tokenService.validateToken(
        token,
        TokenType.ACESSS,
      );
      return !!payload;
    } catch (error) {
      return false;
    }
  }
}

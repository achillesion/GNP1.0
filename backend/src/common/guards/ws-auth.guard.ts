import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
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

  private logger: Logger = new Logger('WsAuthGuard');

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const client: Socket = context.switchToWs().getClient();
    const token = client.handshake.headers.authorization?.replace(
      'Bearer ',
      '',
    );

    if (!token) {
      this.logger.error('Token not found');
      return false;
    }

    return this.validateToken(token, client);
  }

  async validateToken(token: string, client: Socket): Promise<boolean> {
    try {
      const payload = await this.tokenService.validateToken(
        token,
        TokenType.ACESSS,
      );
      this.logger.log(`Payload: ${payload.name}, ${payload.email}`);

      client.handshake.query.sub = payload.sub;

      return !!payload;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }
}

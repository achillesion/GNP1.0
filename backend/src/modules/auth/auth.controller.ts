import { AuthService } from './auth.service';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { LoginUserDto } from './interfaces/dto/login-user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { TokenType } from 'src/common/types/enums/token-type.enum';

@ApiTags('auth')
@Controller('auth')
export class AuthContoller {
  public constructor(private readonly authService: AuthService) {}

  @Post('/register')
  public async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('/login')
  public async signIn(@Body() loginUserDto: LoginUserDto) {
    return this.authService.signIn(loginUserDto);
  }

  @Post('/refresh')
  public async refreshToken(@Req() request: Request) {
    const token = request.headers.authorization?.replace('Bearer ', '');

    return this.authService.refreshToken(token, TokenType.REFRESH);
  }
}

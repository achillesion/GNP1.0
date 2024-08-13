import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthContoller } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenService } from './token.service';
import { UserService } from '../user/user.service';
import { User } from '../../entities/user.entity';
import { UserModule } from '../user/user.module';
import { StorageService } from '../storage/storage.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
    }),
    ConfigModule,
    UserModule,
  ],
  controllers: [AuthContoller],
  providers: [
    AuthService,
    UserService,
    JwtService,
    TokenService,
    StorageService,
  ],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { TokenService } from '../auth/token.service';
import { JwtService } from '@nestjs/jwt';
import { StorageService } from '../storage/storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, TokenService, JwtService, StorageService],
  exports: [UserService, TokenService, JwtService],
})
export class UserModule {}

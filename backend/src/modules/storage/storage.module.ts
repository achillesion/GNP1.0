import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [StorageService, ConfigService],
})
export class StorageModule {}

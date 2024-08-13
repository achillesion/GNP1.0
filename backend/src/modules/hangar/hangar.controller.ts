import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HangarService } from './hangar.service';
import { CreateHangarDto } from './dto/create-hangar.dto';
import { UpdateHangarDto } from './dto/update-hangar.dto';
import { ServerResponse } from '../../common/types';
import { Hangar } from '../../entities/hangar.entity';
import { AuthGuard } from '../../common/guards/auth.guard';
import { Request } from 'express';
import { PageOptionsDto } from '../../common/types/dto/page-options.dto';
import { PageDto } from '../../common/types/dto/page.dto';
import { paginationSchema } from '../../common/swagger/schemas';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from 'src/common/pipes/file-validation.pipe';

@ApiTags('hangars')
@Controller('hangars')
export class HangarController {
  public constructor(private readonly hangarService: HangarService) {}

  @UseGuards(AuthGuard)
  @Post('/')
  @UseInterceptors(FileInterceptor('image'))
  public async createHangar(
    @Body() createHangarDto: CreateHangarDto,
    @UploadedFile(new FileValidationPipe()) file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const userId = req.user.sub;
    return this.hangarService.createHangar(createHangarDto, userId, file);
  }

  @ApiResponse({ status: 200, schema: { example: paginationSchema } })
  @Get('/')
  public async getHangars(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<ServerResponse<PageDto<Hangar>>> {
    return this.hangarService.getHangars(pageOptionsDto);
  }

  @UseGuards(AuthGuard)
  @Get('/users')
  public async getHangarsByUserId(
    @Query() pageOptionsDto: PageOptionsDto,
    @Req() req: Request,
  ) {
    const userId = req.user.sub;
    return this.hangarService.getHangarsByUserId(userId, pageOptionsDto);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  public async getHangarById(@Param('id') id: string) {
    return this.hangarService.getHangarById(id);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  public async updateHangarById(
    @Param('id') id: string,
    @Body() updates: UpdateHangarDto,
  ) {
    return this.hangarService.updateHangarById(id, updates);
  }

  @UseGuards(AuthGuard)
  @Post('/:id/images/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(
    @Param('id') id: string,
    @UploadedFile(new FileValidationPipe()) file: Express.Multer.File,
  ) {
    return this.hangarService.uploadFile(id, file);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  public async deleteHangarById(@Param('id') id: string) {
    return this.hangarService.deleteHangarById(id);
  }
}

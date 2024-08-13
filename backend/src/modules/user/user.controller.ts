import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../../common/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { FileValidationPipe } from 'src/common/pipes/file-validation.pipe';

@ApiTags('users')
@Controller('users')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Post('/images/upload')
  @UseInterceptors(FileInterceptor('image'))
  public async uploadFile(
    @UploadedFile(new FileValidationPipe()) file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const userId = req.user.sub;
    return this.userService.uploadFile(file, userId);
  }

  @UseGuards(AuthGuard)
  @Get('/')
  public async getUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  public async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  public async updateUserById(
    @Param('id') id: string,
    @Body() updates: UpdateUserDto,
  ) {
    return this.userService.updateUserById(id, updates);
  }
}

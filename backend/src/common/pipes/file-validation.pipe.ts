import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { extname } from 'node:path';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  public transform(file: Express.Multer.File) {
    if (file && !this.isFileTypeInvalid(file)) {
      throw new BadRequestException('Invalid file type');
    }
    return file;
  }

  private isFileTypeInvalid(file: Express.Multer.File): boolean {
    const validFileTypes = ['.png', '.jpeg', '.jpg', '.gif'];
    const extension = extname(file.originalname);

    return validFileTypes.includes(extension);
  }
}

import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  public use(request: Request, _response: Response, next: NextFunction) {
    const { method, originalUrl, protocol } = request;

    const userAgent = request.get('user-agent') || '';
    const host = request.get('host');

    const absoluteUrl = protocol + '://' + host + originalUrl;

    const message = `Method: ${method}, url: ${absoluteUrl}, userAgent: ${userAgent}`;

    this.logger.log(message);

    next();
  }
}

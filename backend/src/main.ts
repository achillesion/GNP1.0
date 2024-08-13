import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const configService = new ConfigService();

  const PORT = configService.get('SERVER_PORT') || 3000;
  const NODE_ENV = configService.get('NODE_ENV') || 'development';

  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());

  app.setGlobalPrefix('api');

  if (NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Good Night Planes API')
      .setDescription('The GNP API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(PORT, () => {
    Logger.log(`Server is listening on port ${PORT}`, 'NestApplication');
  });
}

bootstrap();

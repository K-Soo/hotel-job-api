import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
    }),
  );

  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new HttpExceptionFilter(configService));

  const port = configService.get<number>('PORT');

  await app.listen(port);
}
bootstrap();

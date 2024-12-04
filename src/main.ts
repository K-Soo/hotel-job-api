import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { AllExceptionsFilter } from './common/exceptions/all-exception.filter';
import { SwaggerConfigService } from './config/swagger/swagger.config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
    }),
  );

  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost), new HttpExceptionFilter());

  const swaggerConfigService = app.get(SwaggerConfigService);

  swaggerConfigService.setupSwagger(app);

  const port = configService.get<number>('PORT');

  await app.listen(port);
}
bootstrap();

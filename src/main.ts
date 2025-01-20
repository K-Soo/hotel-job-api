import { NestFactory, HttpAdapterHost, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { AllExceptionsFilter } from './common/exceptions/all-exception.filter';
import { SwaggerConfigService } from './config/swagger/swagger.config.service';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

// test
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapterHost = app.get(HttpAdapterHost);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const originUrls = configService.get('ORIGIN');
  // test
  // app.use(helmet());

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 정의되지 않은 값 제거
      stopAtFirstError: true,
      forbidNonWhitelisted: true, // 정의되지 않은 값 전달 시 에러 반환
      transform: true, // 값 변환 활성화
    }),
  );

  app.setGlobalPrefix('api/v1');
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost), new HttpExceptionFilter());

  app.enableCors({
    origin: originUrls,
    credentials: true,
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  const swaggerConfigService = app.get(SwaggerConfigService);

  swaggerConfigService.setupSwagger(app);

  await app.listen(port);
}
bootstrap();

import { NestFactory, HttpAdapterHost, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { AllExceptionsFilter } from './common/exceptions/all-exception.filter';
import { SwaggerConfigService } from './config/swagger/swagger.config.service';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapterHost = app.get(HttpAdapterHost);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  console.log('port: ', port);
  const originUrls = configService.get('ORIGIN');

  app.use(helmet());
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api/v1');
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost), new HttpExceptionFilter());

  app.enableCors({
    // origin: (origin, callback) => {
    //   // origin이 undefined이면 허용 (e.g., Postman 또는 서버 간 요청)
    //   if (!origin || originUrls.includes(origin)) {
    //     callback(null, true); // 허용
    //   } else {
    //     callback(new Error('Not allowed by CORS')); // 거부
    //   }
    // },
    origin: originUrls,
    credentials: true,
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // allowedHeaders: 'Content-Type, Accept',
  });

  const swaggerConfigService = app.get(SwaggerConfigService);

  swaggerConfigService.setupSwagger(app);

  await app.listen(port);
}
bootstrap();

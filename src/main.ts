import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { AllExceptionsFilter } from './common/exceptions/all-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('DEV - API Documentation')
    .setDescription('API documentation for hotel-job application')
    .setVersion('1.0')
    .addBearerAuth() // JWT 인증 추가
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/v1/docs', app, document, {
    customCss: `
    .model-box {
      width: 100% !important; 
    }
    `,
    swaggerOptions: {
      defaultModelExpandDepth: 3, // 모든 모델을 기본 확장
      filter: true, // 엔드포인트 검색 활성화
    },
  });

  const port = configService.get<number>('PORT');

  await app.listen(port);
}
bootstrap();

import { Injectable, NestMiddleware } from '@nestjs/common';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { swaggerOptions } from './swagger.options';
import { NextFunction, Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SwaggerConfigService {
  public setupSwagger(app: INestApplication): void {
    const document: OpenAPIObject = SwaggerModule.createDocument(app, swaggerOptions);

    SwaggerModule.setup('/api/v1/docs', app, document, {
      customCss: `
      .model-box {
        width: 100% !important; 
      }
      `,
      swaggerOptions: {
        defaultModelExpandDepth: 3, // 모든 모델을 기본 확장
        filter: true, // 엔드포인트 검색 활성화
        persistAuthorization: true,
      },
    });
  }
}

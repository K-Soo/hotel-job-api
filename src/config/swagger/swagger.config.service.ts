import { Injectable } from '@nestjs/common';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { swaggerOptions } from './swagger.options';

@Injectable()
export class SwaggerConfigService {
  public setupSwagger(app: INestApplication): void {
    const document: OpenAPIObject = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup('api/v1/docs', app, document);
  }
}

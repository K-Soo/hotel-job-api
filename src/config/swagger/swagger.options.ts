import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerOptions = new DocumentBuilder()
  .setTitle('My App API')
  .setDescription('API documentation for My App')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

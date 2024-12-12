import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerOptions = new DocumentBuilder()
  .setTitle('Hotel Job Connect API')
  .setDescription('API documentation for My App')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

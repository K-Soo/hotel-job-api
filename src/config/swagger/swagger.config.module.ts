import { Module } from '@nestjs/common';
import { SwaggerConfigService } from './swagger.config.service';

@Module({
  providers: [SwaggerConfigService],
  exports: [SwaggerConfigService],
})
export class SwaggerConfigModule {}

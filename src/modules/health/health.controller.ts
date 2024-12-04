import { Controller, Get } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('health')
export class HealthController {
  constructor() {}
  @Get()
  findAll() {
    return { status: 'OK' };
  }
}

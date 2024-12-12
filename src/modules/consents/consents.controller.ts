import { Controller, Get } from '@nestjs/common';
import { ConsentsService } from './consents.service';

@Controller('consents')
export class ConsentsController {
  constructor(private readonly consentsService: ConsentsService) {}

  @Get()
  findAll() {
    return this.consentsService.findAll();
  }
}

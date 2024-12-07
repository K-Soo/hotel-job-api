import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApplicantsService } from './applicants.service';

@Controller('applicants')
export class ApplicantsController {
  constructor(private readonly applicantsService: ApplicantsService) {}

  @Post()
  create(@Body() userId: number) {
    return this.applicantsService.create(userId);
  }

  @Get()
  findAll() {
    return this.applicantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicantsService.findOne(+id);
  }
}

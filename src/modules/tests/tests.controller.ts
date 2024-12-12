import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { TestsService } from './tests.service';
import { CreateTestDto } from './dto/create-test.dto';
import { PassportJwtGuard } from '../../authentication/auth/guards/passport-jwt.guard';
import { Request } from 'express';

@Controller('tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Post()
  create(@Body() createTestDto: CreateTestDto) {
    console.log('createTestDto: ', createTestDto);
    return this.testsService.create(createTestDto);
  }

  @Get()
  @UseGuards(PassportJwtGuard)
  findAll(@Req() req: Request) {
    return this.testsService.findAll();
  }
}

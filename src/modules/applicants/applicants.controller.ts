import { Controller, Get, Post, Body, Param, Req, UseGuards } from '@nestjs/common';
import { ApplicantsService } from './applicants.service';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PassportJwtGuard } from '../../authentication/auth/guards/passport-jwt.guard';
import { Request } from 'express';

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

  @ApiOperation({ summary: '일반 유저 정보' })
  @ApiBearerAuth()
  @UseGuards(PassportJwtGuard)
  @Get('profile')
  find(@Req() req: Request) {
    return this.applicantsService.findOne(req.user['sub']);
  }
}

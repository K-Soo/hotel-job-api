import { Controller, Get, Post, Body, Delete, Req, UseGuards } from '@nestjs/common';
import { ApplicantsService } from './applicants.service';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PassportJwtGuard } from '../../authentication/auth/guards/passport-jwt.guard';
import { Request } from 'express';
import { Roles } from '../../common/decorators/metadata/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
@Controller('applicants')
export class ApplicantsController {
  constructor(private readonly applicantsService: ApplicantsService) {}

  @ApiOperation({ summary: '일반 유저 정보' })
  @ApiBearerAuth()
  @UseGuards(PassportJwtGuard, RolesGuard)
  @Get('profile')
  @Roles('JOB_SEEKER')
  find(@Req() req: Request) {
    return this.applicantsService.findOne(req.user['sub']);
  }

  @ApiOperation({ summary: '계정 삭제요청' })
  @ApiBearerAuth()
  @UseGuards(PassportJwtGuard, RolesGuard)
  @Delete('deactivate')
  @Roles('JOB_SEEKER')
  withdrawUser(@Req() req: Request) {
    return this.applicantsService.withdrawUserForApplicant(req.user['sub']);
  }
}

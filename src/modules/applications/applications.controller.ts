import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplyResumeDto } from './dto/apply-resume.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { PassportJwtGuard } from '../../authentication/auth/guards/passport-jwt.guard';
import { Roles } from '../../common/decorators/metadata/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { ApplicantsService } from '../applicants/applicants.service';
import { ResponseStatus } from '../../common/constants/responseStatus';

@ApiBearerAuth()
@Controller('applications')
@UseGuards(PassportJwtGuard, RolesGuard)
@Roles('JOB_SEEKER', 'EMPLOYER')
export class ApplicationsController {
  constructor(
    private readonly applicationsService: ApplicationsService,
    private readonly applicantsService: ApplicantsService,
  ) {}

  @Post('/apply')
  async createApplyResume(@Req() req: Request, @Body() applyResumeDto: ApplyResumeDto) {
    const userUuid = req.user['uuid'];
    const applicant = await this.applicantsService.findByUuid(userUuid);
    return this.applicationsService.applyResume(applyResumeDto, applicant);
  }

  @Get(':id/apply/check')
  async checkIfAlreadyApplied(@Req() req: Request, @Param('id') recruitId: string) {
    const userUuid = req.user['uuid'];
    const applicant = await this.applicantsService.findByUuid(userUuid);
    const isApplied = await this.applicationsService.checkIfAlreadyApplied(applicant, recruitId);

    if (isApplied) {
      return { status: ResponseStatus.DUPLICATE };
    }

    return { status: ResponseStatus.AVAILABLE };
  }

  @Get()
  async getApplication(@Req() req: Request) {
    const userUuid = req.user['uuid'];

    return { status: ResponseStatus.AVAILABLE };
  }
}

import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplyResumeDto } from './dto/apply-resume.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { PassportJwtGuard } from '../../authentication/auth/guards/passport-jwt.guard';
import { Roles } from '../../common/decorators/metadata/roles.decorator';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Request } from 'express';
import { ApplicantsService } from '../applicants/applicants.service';
import { ResponseStatus } from '../../common/constants/responseStatus';
import { EmployersService } from '../employers/employers.service';
import { ReviewStageStatus } from '../../common/constants/application';
import { UpdateReviewStageDto } from './dto/update-review-stage.dto';
@ApiBearerAuth()
@Controller('applications')
@UseGuards(PassportJwtGuard, RolesGuard)
export class ApplicationsController {
  constructor(
    private readonly applicationsService: ApplicationsService,
    private readonly applicantsService: ApplicantsService,
    private readonly employersService: EmployersService,
  ) {}

  @ApiOperation({ summary: '채용공고 지원하기' })
  @Roles('JOB_SEEKER')
  @Post('/apply')
  async createApplyResume(@Req() req: Request, @Body() applyResumeDto: ApplyResumeDto) {
    const applicant = await this.applicantsService.findByUuid(req.user['sub']);
    return this.applicationsService.applyResume(applyResumeDto, applicant);
  }

  @ApiOperation({ summary: '채용공고 이력서 지원여부 체크' })
  @Roles('JOB_SEEKER')
  @Get(':id/apply/check')
  async checkIfAlreadyApplied(@Req() req: Request, @Param('id') recruitId: string) {
    const applicant = await this.applicantsService.findByUuid(req.user['sub']);
    const isApplied = await this.applicationsService.checkIfAlreadyApplied(applicant, recruitId);

    if (isApplied) {
      return { status: ResponseStatus.DUPLICATE };
    }

    return { status: ResponseStatus.AVAILABLE };
  }

  @ApiOperation({ summary: '채용공고 상태별 지원자 통계' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Recruitment UUID',
    example: 'a14d22fb-7ca7-47a1-b4fe-88bd0edd57e0',
    required: true,
  })
  @Roles('EMPLOYER')
  @Get('/recruitment/:id/status')
  async getRecruitmentApplicationStatusCount(@Req() req: Request, @Param('id') recruitmentId: string) {
    const employer = await this.employersService.findOneUuid(req.user['sub']);

    return this.applicationsService.calculateEmployerReviewStageStatusCount(recruitmentId, employer);
  }

  @ApiOperation({ summary: '채용공고 별 지원자 리스트', description: '채용공고 별 지원자 리스트를 조회합니다.' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Recruitment UUID',
    example: 'fbd01641-24f6-4e61-a727-c59c6ecc41ef',
    required: true,
  })
  @ApiQuery({
    name: 'step',
    type: String,
    description: 'Review Stage Status (DOCUMENT, INTERVIEW, FINAL_ACCEPT, REJECT)',
    required: false,
  })
  @Roles('EMPLOYER')
  @Get('/recruitment/:id')
  async getApplicationsForRecruitment(
    @Req() req: Request,
    @Param('id') recruitmentId: string,
    @Query('step') step?: ReviewStageStatus,
  ) {
    const employer = await this.employersService.findOneUuid(req.user['sub']);

    return this.applicationsService.getApplicationsForRecruitment(recruitmentId, employer, step);
  }

  @ApiOperation({ summary: '채용공고 지원내역' })
  @Roles('JOB_SEEKER')
  @Get('/history')
  async getUserApplicationsHistory(@Req() req: Request) {
    return this.applicationsService.calculateApplicationHistory(req.user['sub']);
  }

  @ApiOperation({ summary: '전형 상태 변경', description: '지원자의 전형 상태를 변경합니다.' })
  @Roles('EMPLOYER')
  @Patch('/recruitment/status/review-stage')
  async updateEmployerReviewStageStatus(@Req() req: Request, @Body() updateReviewStageDto: UpdateReviewStageDto) {
    const employer = await this.employersService.findOneUuid(req.user['sub']);
    return this.applicationsService.updateEmployerReviewStageStatus(updateReviewStageDto, employer);
  }
}

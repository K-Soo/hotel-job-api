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
import { NotificationService } from '../notifications/notifications.service';
import { EmployerReviewStageStatus } from '../../common/constants/application';
import { UpdateReviewStageDto } from './dto/update-review-stage.dto';
import { customHttpException } from '../../common/constants/custom-http-exception';
import { HistoryQueryDto } from './dto/history-query.dto';
import { CategoryType, NotificationType } from '../../common/constants/notification';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
@ApiBearerAuth()
@UseGuards(PassportJwtGuard, RolesGuard)
@Controller('applications')
export class ApplicationsController {
  constructor(
    private readonly applicationsService: ApplicationsService,
    private readonly applicantsService: ApplicantsService,
    private readonly employersService: EmployersService,
    private readonly notificationService: NotificationService,
  ) {}

  @ApiOperation({ summary: '채용공고 지원하기' })
  @Roles('JOB_SEEKER')
  @Post('/apply')
  async createApplyResume(@Req() req: Request, @Body() applyResumeDto: ApplyResumeDto) {
    const applicant = await this.applicantsService.findByUuid(req.user['sub']);

    const application = await this.applicationsService.applyResume(applyResumeDto, applicant);

    await this.notificationService.sendNotification({
      category: CategoryType.APPLICANT,
      title: '',
      userIds: [application.applicantId],
      message: `${application.recruitmentSnapshot.hotelName}의 ${application.recruitmentSnapshot.recruitmentTitle} 지원이 완료되었습니다.`,
      link: '/user/application/history',
      notificationType: [NotificationType.IN_APP],
    });

    await this.notificationService.sendNotification({
      category: CategoryType.APPLICANT,
      title: `${application.recruitmentSnapshot.hotelName}`,
      link: `/employer/recruitment/${application.recruitmentSnapshot.id}/applicant`,
      userIds: [application.recruitmentSnapshot.employerId],
      message: `${application.resume?.name}님이 ${application.recruitmentSnapshot?.recruitmentTitle} 포지션에 지원했습니다.`,
      notificationType: [NotificationType.IN_APP, NotificationType.PUSH],
    });

    return { status: ResponseStatus.SUCCESS };
  }

  @ApiOperation({ summary: '채용공고 이력서 지원여부 체크' })
  @Roles('JOB_SEEKER')
  @Get(':id/apply/check')
  async checkIfAlreadyApplied(@Req() req: Request, @Param('id') recruitId: string) {
    if (!recruitId) {
      throw new BadRequestException();
    }

    const applicant = await this.applicantsService.findByUuid(req.user['sub']);

    return this.applicationsService.checkIfAlreadyApplied(applicant, recruitId);
  }

  @ApiOperation({ summary: '공고지원자관리 -> 채용공고상세 전형 상태 통계' })
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
    if (!employer) {
      throw new NotFoundException(customHttpException.NOT_FOUND_USER);
    }
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
    @Query('step') step?: EmployerReviewStageStatus,
  ) {
    const employer = await this.employersService.findOneUuid(req.user['sub']);
    if (!employer) {
      throw new NotFoundException(customHttpException.NOT_FOUND_USER);
    }
    return this.applicationsService.getApplicationsForRecruitment(recruitmentId, employer, step);
  }

  @ApiOperation({ summary: '채용공고 지원내역' })
  @Roles('JOB_SEEKER')
  @Get('/history')
  async getUserApplicationsHistory(@Req() req: Request, @Query() query: HistoryQueryDto) {
    return this.applicationsService.getUserApplicationsHistory(req.user['sub'], query);
  }

  @ApiOperation({ summary: '채용공고 지원 상태별 개수' })
  @Roles('JOB_SEEKER')
  @Get('/history/status')
  async getUserApplicationsHistoryStatus(@Req() req: Request) {
    return this.applicationsService.getUserApplicationsHistoryStatus(req.user['sub']);
  }

  @ApiOperation({ summary: '전형 상태 변경', description: '지원자의 전형 상태를 변경합니다.' })
  @Roles('EMPLOYER')
  @Patch('/recruitment/status/review-stage')
  async updateEmployerReviewStageStatus(@Req() req: Request, @Body() updateReviewStageDto: UpdateReviewStageDto) {
    const employer = await this.employersService.findOneUuid(req.user['sub']);

    if (!employer) {
      throw new NotFoundException(customHttpException.NOT_FOUND_USER);
    }

    return this.applicationsService.updateEmployerReviewStageStatus(updateReviewStageDto, employer);
  }

  @ApiOperation({ summary: '이력서 열람처리', description: '지원자의 이력서를 열람 처리합니다.' })
  @Roles('EMPLOYER')
  @Patch('/view')
  async updateMarkResumeAsView(@Req() req: Request, @Body() body: { applicationId: number }) {
    if (!body.applicationId) {
      throw new BadRequestException();
    }

    const employer = await this.employersService.findOneUuid(req.user['sub']);

    if (!employer) {
      throw new NotFoundException(customHttpException.NOT_FOUND_USER);
    }

    return this.applicationsService.markResumeAsViewed(body.applicationId, employer);
  }

  @ApiOperation({ summary: '채용공고 지원 취소', description: '지원자의 이력서 지원을 취소합니다.' })
  @Roles('JOB_SEEKER')
  @Patch('/cancel')
  async cancelApplication(@Req() req: Request, @Body() body: { applicationId: number }) {
    if (!body.applicationId) {
      throw new BadRequestException();
    }

    const application = await this.applicationsService.cancelApplication(body.applicationId, req.user['sub']);

    await this.notificationService.sendNotification({
      category: CategoryType.APPLICANT,
      title: '',
      link: `/employer/recruitment/${application.recruitmentSnapshot.id}/applicant`,
      userIds: [application.recruitmentSnapshot.employerId],
      message: `${application.resumeSnapshot?.name}님이 ${application.recruitmentSnapshot?.recruitmentTitle} 포지션의 지원을 취소했습니다.`,
      notificationType: [NotificationType.IN_APP, NotificationType.PUSH],
    });

    return { status: ResponseStatus.SUCCESS };
  }
}

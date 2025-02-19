import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { ApplyResumeDto } from './dto/apply-resume.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recruitment } from '../employers/recruitment/entities/recruitment.entity';
import { In, Not, Repository } from 'typeorm';
import { Resume } from '../resumes/entities/resume.entity';
import { Application } from './entities/application.entity';
import { Applicant } from '../applicants/entities/applicant.entity';
import { ApplicationStatus, EmployerReviewStageStatus, ReviewStageStatus } from '../../common/constants/application';
import { Employer } from '../employers/entities/employer.entity';
import { UpdateReviewStageDto } from './dto/update-review-stage.dto';
import { cloneDeep } from 'lodash';
import { ResponseStatus } from '../../common/constants/responseStatus';
import { safeQuery } from '../../common/helpers/database.helper';
import { HistoryQueryDto } from './dto/history-query.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Resume) private resumeRepo: Repository<Resume>,
    @InjectRepository(Recruitment) private recruitmentRepo: Repository<Recruitment>,
    @InjectRepository(Application) private applicationRepo: Repository<Application>,
  ) {}

  /**
   * 유저 - 지원이력 체크
   * @description: 지원 취소 시 중복 지원 가능
   */
  async checkIfAlreadyApplied(applicant: Applicant, recruitId: string): Promise<boolean> {
    const existingApplication = await this.applicationRepo.findOne({
      where: {
        resume: { applicant: { id: applicant.id } },
        recruitment: { id: recruitId },
        applicationStatus: Not(ApplicationStatus.CANCELED),
      },
    });

    console.log('existingApplication: ', existingApplication);

    return !!existingApplication;
  }

  // 이력서 지원
  async applyResume(applyResumeDto: ApplyResumeDto, applicant: Applicant) {
    const { resumeId, recruitId } = applyResumeDto;

    const alreadyApplied = await this.checkIfAlreadyApplied(applicant, recruitId);
    if (alreadyApplied) {
      throw new ConflictException('Already Applied');
    }

    const resume = await this.resumeRepo.findOne({
      where: { id: resumeId, applicant },
      relations: ['experience', 'military', 'condition'],
    });

    if (!resume) {
      throw new NotFoundException('Resume Not found');
    }

    const recruitment = await this.recruitmentRepo.findOne({ where: { id: recruitId } });

    if (!recruitment) {
      throw new NotFoundException('Recruitment Not found');
    }

    const application = this.applicationRepo.create({
      resume,
      resumeSnapshot: cloneDeep(resume),
      recruitment,
      applicantId: applicant.id,
      recruitmentSnapshot: cloneDeep(recruitment),
      applicationStatus: ApplicationStatus.APPLIED,
      applyAt: new Date(),
    });

    return await this.applicationRepo.save(application);
  }

  /**
   * 사업자 - 채용공고별 지원자 목록 조회
   */
  getApplicationsForRecruitment(recruitmentId: string, employer: Employer, step?: EmployerReviewStageStatus) {
    const stepCondition = step ? { employerReviewStageStatus: step } : {};

    return this.applicationRepo.find({
      where: { recruitment: { id: recruitmentId, employer }, ...stepCondition },
      relations: ['announcementRecipients', 'announcementRecipients.announcement'],
    });
  }

  /**
   * 유저 - 지원이력 조회
   */
  async getUserApplicationsHistory(uuid: string, queryFilter: HistoryQueryDto) {
    const { status } = queryFilter;

    let modifiedFilter: ReviewStageStatus[] | undefined = undefined;

    if (status) {
      modifiedFilter =
        status === ReviewStageStatus.ACCEPT ? [ReviewStageStatus.ACCEPT, ReviewStageStatus.INTERVIEW_PASS] : [status];
    }

    const applications = await this.applicationRepo.find({
      where: {
        resume: { applicant: { id: uuid } },
        ...(modifiedFilter && { reviewStageStatus: In(modifiedFilter) }),
      },
      relations: ['resume', 'recruitment', 'announcementRecipients', 'announcementRecipients.announcement'],
      order: { applyAt: 'DESC' },
    });

    return applications.map((application) => ({
      id: application.id,

      recruitmentSnapshot: {
        id: application.recruitmentSnapshot.id,
        title: application.recruitmentSnapshot.recruitmentTitle,
        hotelName: application.recruitmentSnapshot.hotelName,
        recruitmentStatus: application.recruitmentSnapshot.recruitmentStatus,
      },

      announcementRecipients: application.announcementRecipients.map((recipient) => {
        const { message, ...rest } = recipient.announcement;

        const filledTemplateMessage = message
          .replace(/\$이름\$/g, application.resumeSnapshot.name)
          .replace(/\$업체명\$/g, application.recruitmentSnapshot.hotelName)
          .replace(/\$공고명\$/g, application.recruitmentSnapshot.recruitmentTitle);

        return {
          ...rest,
          message: filledTemplateMessage,
        };
      }),

      resumeSnapshot: {
        title: application.resumeSnapshot.title,
        isDefault: application.resumeSnapshot.isDefault,
        name: application.resumeSnapshot.name,
        phone: application.resumeSnapshot.phone,
      },

      applicationStatus: application.applicationStatus,
      reviewStageStatus: application.reviewStageStatus,

      isView: application.isView,
      applyAt: application.applyAt,
      viewAt: application.viewAt,
      cancelAt: application.cancelAt,
      acceptAt: application.acceptAt,
      rejectAt: application.rejectAt,
      createdAt: application.createdAt,
    }));
  }
  /**
   * 유저 - 지원이력 상태 계수
   */
  async getUserApplicationsHistoryStatus(userId: string) {
    const query = this.applicationRepo
      .createQueryBuilder('application')
      .select('application.reviewStageStatus', 'status') // 전형 상태 선택
      .addSelect('COUNT(application.id)', 'count') // 상태별 개수 카운트
      .innerJoin('application.resume', 'resume') // resume 조인
      .innerJoin('resume.applicant', 'applicant') // applicant 조인
      .where('applicant.id = :userId', { userId }) // 특정 사용자 필터링
      .groupBy('application.reviewStageStatus'); // 전형 상태별 그룹화

    const result = await query.getRawMany();

    const initialCounts: Record<ReviewStageStatus, number> = Object.values(ReviewStageStatus).reduce(
      (acc, status) => {
        acc[status as ReviewStageStatus] = 0;
        return acc;
      },
      {} as Record<ReviewStageStatus, number>,
    );

    const formattedResult = result.reduce((acc, { status, count }) => {
      const parsedCount = parseInt(count, 10);

      if (status === ReviewStageStatus.INTERVIEW_PASS) {
        acc[ReviewStageStatus.ACCEPT] += parsedCount; // INTERVIEW_PASS → ACCEPT 합산
      } else {
        acc[status as ReviewStageStatus] = parsedCount;
      }

      return acc;
    }, initialCounts);

    const total = Object.values(formattedResult).reduce((sum: number, count: number) => sum + count, 0);

    return {
      TOTAL: total,
      ...formattedResult,
    };
  }

  /**
   * 전형 상태 변경(시업자 전용)
   */
  async updateEmployerReviewStageStatus(updateReviewStageDto: UpdateReviewStageDto, employer: Employer) {
    const application = await this.applicationRepo.findOne({
      where: {
        id: updateReviewStageDto.applicationId,
        recruitment: { employer: { id: employer.id } },
      },
      relations: ['recruitment'],
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    application.employerReviewStageStatus = updateReviewStageDto.stage;

    await this.applicationRepo.save(application);

    return { status: ResponseStatus.SUCCESS };
  }

  /**
   *  사업자 - 채용공고별 전형 상태별 지원자 수 계산
   */
  async calculateEmployerReviewStageStatusCount(recruitmentId: string, employer: Employer) {
    const result = await this.applicationRepo
      .createQueryBuilder('application')
      .select('application.employerReviewStageStatus', 'status') // 선택된 전형 상태
      .addSelect('COUNT(application.id)', 'count') // 상태별 카운트
      .innerJoin('application.recruitment', 'recruitment') // recruitment 조인
      .innerJoin('recruitment.employer', 'employer') // employer 조인
      .where('recruitment.id = :recruitmentId', { recruitmentId })
      .andWhere('employer.id = :employerId', { employerId: employer.id })
      .groupBy('application.employerReviewStageStatus') // 전형 상태별 그룹화
      .getRawMany();

    const initialCounts: Record<ReviewStageStatus, number> = Object.values(ReviewStageStatus).reduce(
      (acc, status) => {
        if (status === ReviewStageStatus.INTERVIEW_PASS) return acc;
        acc[status as ReviewStageStatus] = 0;
        return acc;
      },
      {} as Record<ReviewStageStatus, number>,
    );

    const formattedResult = result.reduce((acc, { status, count }) => {
      acc[status as ReviewStageStatus] = parseInt(count, 10);
      return acc;
    }, initialCounts);

    const total = Object.values(formattedResult).reduce((sum: any, count: number) => {
      return sum + count;
    }, 0);

    return {
      TOTAL: total,
      ...formattedResult,
    };
  }

  /**
   *  사업자 - 이력서 열람처리
   */
  async markResumeAsViewed(applicationId: number, employer: Employer) {
    const application = await this.applicationRepo.findOne({
      where: { id: applicationId },
      relations: ['recruitment', 'recruitment.employer'],
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    if (application.recruitment.employer.id !== employer.id) {
      throw new ForbiddenException();
    }

    if (application.isView) {
      return { status: ResponseStatus.DUPLICATE };
    }

    application.isView = true;
    application.viewAt = new Date();

    await this.applicationRepo.save(application);

    return { status: ResponseStatus.SUCCESS };
  }

  /**
   *  유저 -채용공고 지원취소
   */
  async cancelApplication(applicationId: number, userId: string) {
    const result = await safeQuery(() =>
      this.applicationRepo.update(
        { id: applicationId, applicantId: userId },
        { applicationStatus: ApplicationStatus.CANCELED, cancelAt: new Date() },
      ),
    );

    if (result.affected === 0) {
      throw new NotFoundException();
    }

    return { status: ResponseStatus.SUCCESS };
  }
}

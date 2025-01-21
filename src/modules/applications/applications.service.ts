import { ConflictException, ForbiddenException, Injectable, NotFoundException, Res } from '@nestjs/common';
import { ApplyResumeDto } from './dto/apply-resume.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recruitment } from '../employers/recruitment/entities/recruitment.entity';
import { Repository } from 'typeorm';
import { Resume } from '../resumes/entities/resume.entity';
import { Application } from './entities/application.entity';
import { Applicant } from '../applicants/entities/applicant.entity';
import { ApplicationStatus, ReviewStageStatus } from '../../common/constants/application';
import { Role } from '../../common/constants/app.enum';
import { Employer } from '../employers/entities/employer.entity';
import { UpdateReviewStageDto } from './dto/update-review-stage.dto';
import { cloneDeep } from 'lodash';
import { ResponseStatus } from '../../common/constants/responseStatus';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Resume) private resumeRepo: Repository<Resume>,
    @InjectRepository(Recruitment) private recruitmentRepo: Repository<Recruitment>,
    @InjectRepository(Application) private applicationRepo: Repository<Application>,
  ) {}

  async checkIfAlreadyApplied(applicant: Applicant, recruitId: string): Promise<boolean> {
    const existingApplication = await this.applicationRepo.findOne({
      where: {
        resume: { applicant: { id: applicant.id } },
        recruitment: { id: recruitId },
      },
    });

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

    const snapshot = cloneDeep(resume);

    const application = this.applicationRepo.create({
      resume,
      recruitment,
      applicationStatus: ApplicationStatus.APPLIED,
      applyAt: new Date(),
      resumeSnapshot: snapshot,
    });
    return await this.applicationRepo.save(application);
  }

  // 채용공고별 지원자 목록
  getApplicationsForRecruitment(recruitmentId: string, employer: Employer, step?: ReviewStageStatus) {
    const stepCondition = step ? { employerReviewStageStatus: step } : {};

    return this.applicationRepo.find({
      where: { recruitment: { id: recruitmentId, employer }, ...stepCondition },
    });
  }

  // 유저 - 지원내역 목록
  async calculateApplicationHistory(uuid: string) {
    const applications = await this.applicationRepo.find({
      where: {
        resume: { applicant: { id: uuid } },
      },
      relations: ['resume', 'recruitment'],
      order: { applyAt: 'DESC' },
    });

    return applications.map((application) => ({
      applicationId: application.id,
      recruitment: {
        id: application.recruitment.id,
        title: application.recruitment.recruitmentTitle,
        hotelName: application.recruitment.hotelName,
        recruitmentStatus: application.recruitment.recruitmentStatus,
      },
      resume: {
        title: application.resumeSnapshot.title,
        isDefault: application.resumeSnapshot.isDefault,
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
  async updateEmployerReviewStageStatus(updateReviewStageDto: UpdateReviewStageDto, employer: Employer) {
    const application = await this.applicationRepo.findOne({
      where: { id: updateReviewStageDto.applicationId },
      relations: ['recruitment', 'recruitment.employer'],
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    if (application.recruitment.employer.id !== employer.id) {
      throw new ForbiddenException();
    }

    application.employerReviewStageStatus = updateReviewStageDto.stage;

    await this.applicationRepo.save(application);

    return { status: ResponseStatus.SUCCESS };
  }

  async calculateEmployerReviewStageStatusCount(recruitmentId: string, employer: Employer) {
    console.log('recruitmentId: ', recruitmentId);
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

  // 열람처리
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
}

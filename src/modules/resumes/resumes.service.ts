import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Resume } from './entities/resume.entity';
import { Repository } from 'typeorm';
import { Applicant } from '../applicants/entities/applicant.entity';
import { safeQuery } from '../../common/helpers/database.helper';
import { customHttpException } from '../../common/constants/custom-http-exception';
import { ResponseStatus } from '../../common/constants/responseStatus';
import { ExperiencesService } from '../experiences/experiences.service';
import { DataSource } from 'typeorm';
import { ResumeStatus, SanctionReason, ResumeType, Role } from '../../common/constants/app.enum';
import { PublishResumeDto } from './dto/publish-resume.dto';
import { CertificationService } from '../../authentication/certification/certification.service';
import { Experience } from '../experiences/entities/experience.entity';
@Injectable()
export class ResumesService {
  constructor(
    @InjectRepository(Resume) private resumeRepo: Repository<Resume>,
    private readonly dataSource: DataSource,
    private readonly experienceService: ExperiencesService,
    private readonly certificationService: CertificationService,
  ) {}

  async createResume(applicant: Applicant) {
    try {
      const existingResumes = await this.resumeRepo.find({
        where: { applicant },
        relations: ['experience'],
      });

      if (existingResumes.length >= 5) {
        throw new BadRequestException(customHttpException.CREATION_LIMIT_EXCEEDED);
      }

      const userCertInfo = await this.certificationService.checkDuplicateCertification(applicant);

      if (!userCertInfo) {
        throw new UnauthorizedException(customHttpException.CERTIFICATION_UNAUTHORIZED);
      }

      // initial Create Resume
      if (existingResumes.length === 0) {
        const resume = this.resumeRepo.create({ applicant });
        resume.isDefault = true; // 기본 이력서
        resume.isVisible = true; // 기본 이력서 노출
        resume.status = ResumeStatus.DRAFT;
        resume.sanctionReason = SanctionReason.NONE;
        resume.resumeType = ResumeType.GENERAL;
        resume.title = '이력서 제목을 입력해주세요';

        // 관계에서 가져옴 임시데이터
        // 기본 프로필 데이터 설정
        resume.profileImage = '';
        resume.name = userCertInfo.user_name;
        resume.localCode = userCertInfo.local_code;
        resume.sexCode = userCertInfo.sex_code;
        resume.phone = userCertInfo.phone_no;
        resume.birthday = userCertInfo.birth_day;

        resume.address = '';
        resume.addressDetail = '';
        resume.email = applicant.email || '';

        resume.careerLevel = null;
        resume.education = null;

        resume.careerDetail = '';
        resume.isRequiredAgreement = false;
        resume.isOptionalAgreement = false;

        resume.createdAt = new Date();
        resume.updatedAt = new Date();

        const savedResume = await this.resumeRepo.save(resume);

        return { status: ResponseStatus.SUCCESS, id: savedResume.id };
      }

      // 이력서 복사
      if (existingResumes.length !== 0) {
        const baseResume = existingResumes.find((resume) => resume.isDefault);

        const copiedResume = this.resumeRepo.create({
          ...baseResume,
          applicant,
          id: undefined, // 새 ID를 생성
          isDefault: false, // 기본 이력서 비활성화
        });

        const experiencesCopy = baseResume.experience.map((exp) => ({
          ...exp,
          id: undefined, // 새로운 ID 생성
          createdAt: new Date(),
          updatedAt: new Date(),
          resume: copiedResume, // 새로 생성된 copiedResume와 연결
        }));

        copiedResume.experience = experiencesCopy; // 관계 설정

        copiedResume.title = `[복사]${baseResume.title}`;
        copiedResume.status = ResumeStatus.DRAFT;
        copiedResume.createdAt = new Date();
        copiedResume.updatedAt = new Date();

        const savedCopiedResume = await this.resumeRepo.save(copiedResume);

        return { status: ResponseStatus.SUCCESS, id: savedCopiedResume.id };
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(customHttpException.DATABASE_OPERATION_FAILED);
    }
  }

  async publishResume(publishResumeDto: PublishResumeDto, applicant: Applicant) {
    const { id, experience: newExperiences, ...updateData } = publishResumeDto;

    const resume = await this.resumeRepo.findOne({
      where: { id, applicant },
      relations: ['experience'],
    });

    if (!resume) {
      throw new NotFoundException('Not found resume');
    }

    if (newExperiences) {
      const experienceRepo = this.dataSource.getRepository(Experience);
      // 1. 기존 경력 데이터 제거
      await experienceRepo.delete({ resume: { id: resume.id } });

      // 2. 새로운 경력 데이터 추가
      const newExperienceEntities = newExperiences.map((exp) => experienceRepo.create(exp));
      resume.experience = newExperienceEntities; // 새로운 경험 데이터를 할당 (덮어쓰기)
    }

    const mergedResume = this.resumeRepo.merge(resume, updateData, {
      status: ResumeStatus.PUBLISH,
      updatedAt: new Date(),
    });

    await this.resumeRepo.save(mergedResume);
    return { status: ResponseStatus.SUCCESS, id: resume.id };
  }

  async getAllResumesWithApplication(uuid: string) {
    const resumes = await this.resumeRepo.find({
      where: { applicant: { id: uuid } },
      relations: ['applications', 'applications.recruitment'],
    });

    // 이력서 정렬: isDefault true가 맨 위로
    const sortedResumes = resumes.sort((a, b) => {
      if (a.isDefault && !b.isDefault) return -1;
      if (!a.isDefault && b.isDefault) return 1;
      return 0;
    });

    return sortedResumes.map((resume) => ({
      ...resume,
      applicationsCount: resume.applications.length,
    }));
  }

  getAvailableResumes(uuid: string) {
    return this.resumeRepo.find({
      where: { applicant: { id: uuid } },
    });
  }

  async findOne(uuid: string) {
    return safeQuery(() => this.resumeRepo.findOne({ where: { id: uuid }, relations: ['experience'] }));
  }

  async removeResume(id: string, userUuid: string) {
    const resume = await this.resumeRepo.findOne({
      where: { id, applicant: { id: userUuid } },
    });

    if (!resume) {
      throw new NotFoundException('Resume not found or you do not have access.');
    }

    await safeQuery(() => this.resumeRepo.delete(resume.id));

    return { status: ResponseStatus.SUCCESS };
  }
}

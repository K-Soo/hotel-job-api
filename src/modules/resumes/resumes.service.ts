import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Resume } from './entities/resume.entity';
import { Repository } from 'typeorm';
import { Applicant } from '../applicants/entities/applicant.entity';
import { safeQuery } from '../../common/helpers/database.helper';
import { customHttpException } from '../../common/constants/custom-http-exception';
import { ResponseStatus } from '../../common/constants/responseStatus';
import { ExperiencesService } from '../experiences/experiences.service';
import { MilitaryService } from '../military/military.service';
import { DataSource } from 'typeorm';
import { ResumeStatus, SanctionReason, ResumeType, LicenseStage } from '../../common/constants/app.enum';
import { PublishResumeDto } from './dto/publish-resume.dto';

@Injectable()
export class ResumesService {
  constructor(
    @InjectRepository(Resume) private resumeRepo: Repository<Resume>,
    private readonly dataSource: DataSource,
    private readonly experienceService: ExperiencesService,
    private readonly militaryService: MilitaryService,
  ) {}

  async initialCreateResume(applicant: Applicant) {
    try {
      const existingResumes = await this.resumeRepo.find({ where: { applicant }, relations: ['applicant'] });

      // if (existingResumes >= 5) {
      //   throw new BadRequestException(customHttpException.CREATION_LIMIT_EXCEEDED);
      // }

      // initial Create Resume
      if (existingResumes.length === 0) {
        const resume = this.resumeRepo.create({ applicant });
        resume.isDefault = true; // 기본 이력서
        resume.isVisible = true; // 기본 이력서 노출
        resume.status = ResumeStatus.DRAFT;
        resume.sanctionReason = SanctionReason.NONE;
        resume.resumeType = ResumeType.GENERAL;
        resume.title = '기본 이력서(이력서 제목을 입력해주세요)';

        // 관계에서 가져옴 임시데이터
        // 기본 프로필 데이터 설정
        resume.profileImage = '';
        resume.name = '고원호';
        resume.localCode = '01';
        resume.sexCode = '01';
        resume.phone = '01012345678';
        resume.birthday = '19900101';
        resume.address = '경기도 남양주시 두물로';
        resume.addressDetail = '202호';

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

      const baseResume = existingResumes[0];
      console.log('baseResume: ', baseResume);

      const copiedResume = this.resumeRepo.create({
        ...baseResume,
        id: undefined, // 새 ID를 생성
        isDefault: false, // 기본 이력서 비활성화
      });

      copiedResume.title = `[복사] ${baseResume.title}`;
      copiedResume.status = ResumeStatus.DRAFT;
      copiedResume.createdAt = new Date();
      copiedResume.updatedAt = new Date();

      await this.resumeRepo.save(copiedResume);

      return { status: ResponseStatus.SUCCESS, id: copiedResume.id };

      // return this.dataSource.transaction(async (manager) => {
      //   try {
      //     // 1. Resume 저장
      //     const resume = this.resumeRepo.create({ ...createResumeDto, applicant });
      //     const savedResume = await manager.save(Resume, resume);

      //     // 2. Experiences 저장
      //     if (createResumeDto.experiences?.length > 0) {
      //       await this.experienceService.create(createResumeDto.experiences, savedResume, manager);
      //     }

      //     // 3. Licenses 저장
      //     if (createResumeDto.licenses?.length > 0) {
      //       await this.licensesService.create(createResumeDto.licenses, savedResume, manager);
      //     }

      //     // 4. Military 저장
      //     if (createResumeDto.military) {
      //       await this.militaryService.create(createResumeDto.military, savedResume, manager);
      //     }

      //     return { status: 'success' };
      //   } catch (error) {
      //     console.log('error: ', error.message);
      //     throw new BadRequestException(customHttpException.DATABASE_OPERATION_FAILED);
      //   }
      // });
    } catch (error) {
      console.log('error: ', error);
      throw new BadRequestException(customHttpException.DATABASE_OPERATION_FAILED);
    }
  }

  async publishResume(publishResumeDto: PublishResumeDto, applicant: Applicant) {
    const { id, ...updateData } = publishResumeDto;

    const resume = await this.resumeRepo.findOne({
      where: { id, applicant },
    });

    if (!resume) {
      throw new NotFoundException('Not found resume');
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
      relations: ['applications'],
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
    return safeQuery(() => this.resumeRepo.findOne({ where: { id: uuid } }));
  }

  remove(id: number) {
    return `This action removes a #${id} resume`;
  }
}

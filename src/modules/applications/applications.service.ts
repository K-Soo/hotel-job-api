import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ApplyResumeDto } from './dto/apply-resume.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recruitment } from '../employers/recruitment/entities/recruitment.entity';
import { Repository } from 'typeorm';
import { Resume } from '../resumes/entities/resume.entity';
import { Application } from './entities/application.entity';
import { Applicant } from '../applicants/entities/applicant.entity';
import { ApplicationStatus } from '../../common/constants/application';
import { Role } from '../../common/constants/app.enum';

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
        role: Role.JOB_SEEKER,
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

    const resume = await this.resumeRepo.findOne({ where: { id: resumeId, applicant } });
    if (!resume) {
      throw new NotFoundException('Resume Not found');
    }

    const recruitment = await this.recruitmentRepo.findOne({ where: { id: recruitId } });
    if (!recruitment) {
      throw new NotFoundException('Recruitment Not found');
    }

    const application = this.applicationRepo.create({
      resume,
      recruitment,
      role: Role.JOB_SEEKER,
      applyAt: new Date(),
      applicationStatus: ApplicationStatus.APPLIED,
      resumeSnapshot: {
        title: resume.title,
        name: resume.name,
        localCode: resume.localCode,
        sexCode: resume.sexCode,
        birthday: resume.birthday,
      },
    });
    return await this.applicationRepo.save(application);
  }
}

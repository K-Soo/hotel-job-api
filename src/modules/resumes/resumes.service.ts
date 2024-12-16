import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Resume } from './entities/resume.entity';
import { Repository } from 'typeorm';
import { Applicant } from '../applicants/entities/applicant.entity';
import { safeQuery } from '../../common/helpers/database.helper';
import { customHttpException } from '../../common/constants/custom-http-exception';
import { ExperiencesService } from '../experiences/experiences.service';
import { LicensesService } from '../licenses/licenses.service';
import { MilitaryService } from '../military/military.service';
import { DataSource } from 'typeorm';

@Injectable()
export class ResumesService {
  constructor(
    @InjectRepository(Resume) private resumeRepo: Repository<Resume>,
    private readonly dataSource: DataSource,
    private readonly experienceService: ExperiencesService,
    private readonly licensesService: LicensesService,
    private readonly militaryService: MilitaryService,
  ) {}

  async create(createResumeDto: CreateResumeDto, applicant: Applicant) {
    const existingResumes = await this.resumeRepo.count({ where: { applicant } });

    if (existingResumes >= 5) {
      throw new BadRequestException(customHttpException.CREATION_LIMIT_EXCEEDED);
    }

    return this.dataSource.transaction(async (manager) => {
      // 1. Resume 저장
      const resume = this.resumeRepo.create({ ...createResumeDto, applicant });
      const savedResume = await manager.save(Resume, resume);

      // 2. Experiences 저장
      if (createResumeDto.experiences?.length > 0) {
        await this.experienceService.create(createResumeDto.experiences, savedResume, manager);
      }

      // 3. Licenses 저장
      if (createResumeDto.licenses?.length > 0) {
        await this.licensesService.create(createResumeDto.licenses, savedResume, manager);
      }

      // 4. Military 저장
      if (createResumeDto.military) {
        await this.militaryService.create(createResumeDto.military, savedResume, manager);
      }

      return { success: true };
    });
  }

  findAll(uuid: string) {
    return this.resumeRepo.find({ where: { applicant: { id: uuid } } });
  }

  findOne(uuid: string) {
    return safeQuery(() => this.resumeRepo.find({ where: { uuid }, relations: ['applicant', 'experience'] }));
  }

  update(id: number, updateResumeDto: UpdateResumeDto) {
    return `This action updates a #${id} resume`;
  }

  remove(id: number) {
    return `This action removes a #${id} resume`;
  }
}

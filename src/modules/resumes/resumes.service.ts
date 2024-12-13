import { Injectable } from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Resume } from './entities/resume.entity';
import { Repository } from 'typeorm';
import { Applicant } from '../applicants/entities/applicant.entity';
import { safeQuery } from '../../common/helpers/database.helper';

@Injectable()
export class ResumesService {
  constructor(@InjectRepository(Resume) private resumeRepo: Repository<Resume>) {}

  create(createResumeDto: CreateResumeDto, applicant: Applicant) {
    const resume = this.resumeRepo.create({ ...createResumeDto, applicant, applicantId: applicant.id });
    return safeQuery(() => this.resumeRepo.save(resume));
  }

  findAll(uuid: string) {
    return this.resumeRepo.find({ where: { applicantId: uuid } });
  }

  findOne(uuid: string) {
    return `This action returns a #${uuid} resume`;
  }

  update(id: number, updateResumeDto: UpdateResumeDto) {
    return `This action updates a #${id} resume`;
  }

  remove(id: number) {
    return `This action removes a #${id} resume`;
  }
}

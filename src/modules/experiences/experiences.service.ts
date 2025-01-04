import { Injectable } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Experience } from './entities/experience.entity';
import { Resume } from '../resumes/entities/resume.entity';

@Injectable()
export class ExperiencesService {
  constructor(
    @InjectRepository(Experience)
    private readonly experienceRepo: Repository<Experience>,
  ) {}

  async create(experiences: CreateExperienceDto[], resume: Resume, manager: EntityManager) {
    const experienceEntities = experiences.map((experience) => this.experienceRepo.create({ ...experience, resume }));

    await manager.save(Experience, experienceEntities);
  }

  findAll() {
    return `This action returns all experiences`;
  }

  findOne(id: number) {
    return `This action returns a #${id} experience`;
  }

  update(id: number, updateExperienceDto: UpdateExperienceDto) {
    return `This action updates a #${id} experience`;
  }

  remove(id: number) {
    return `This action removes a #${id} experience`;
  }
}

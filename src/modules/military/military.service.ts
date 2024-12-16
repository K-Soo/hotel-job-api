import { Injectable } from '@nestjs/common';
import { CreateMilitaryDto } from './dto/create-military.dto';
import { UpdateMilitaryDto } from './dto/update-military.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Military } from './entities/military.entity';
import { EntityManager, Repository } from 'typeorm';
import { Resume } from '../resumes/entities/resume.entity';

@Injectable()
export class MilitaryService {
  constructor(@InjectRepository(Military) private readonly militaryRepo: Repository<Military>) {}

  async create(createMilitaryDto: CreateMilitaryDto, resume: Resume, manager: EntityManager) {
    const military = this.militaryRepo.create({ ...createMilitaryDto, resume });
    await manager.save(Military, military);
  }

  findAll() {
    return `This action returns all military`;
  }

  findOne(id: number) {
    return `This action returns a #${id} military`;
  }

  update(id: number, updateMilitaryDto: UpdateMilitaryDto) {
    return `This action updates a #${id} military`;
  }

  remove(id: number) {
    return `This action removes a #${id} military`;
  }
}

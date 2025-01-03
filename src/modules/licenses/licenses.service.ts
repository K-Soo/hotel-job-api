import { Injectable } from '@nestjs/common';
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { License } from './entities/license.entity';
import { Resume } from '../resumes/entities/resume.entity';

@Injectable()
export class LicensesService {
  constructor(@InjectRepository(License) private readonly licenseRepo: Repository<License>) {}

  async create(createLicenseDto: CreateLicenseDto[], resume: Resume, manager: EntityManager) {
    const licenseEntities = createLicenseDto.map((license) => this.licenseRepo.create({ ...license, resume }));
    await manager.save(License, licenseEntities);
  }

  findAll() {
    return `This action returns all licenses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} license`;
  }

  update(id: number, updateLicenseDto: UpdateLicenseDto) {
    return `This action updates a #${id} license`;
  }

  remove(id: number) {
    return `This action removes a #${id} license`;
  }
}

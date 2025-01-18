import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Resume } from '../resumes/entities/resume.entity';
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { safeQuery } from '../../common/helpers/database.helper';
import { customHttpException } from '../../common/constants/custom-http-exception';

@Injectable()
export class TalentsService {
  constructor(@InjectRepository(Resume) private resumeRepo: Repository<Resume>) {}

  async findAll(options: IPaginationOptions) {
    const data = await paginate<Resume>(this.resumeRepo, options, {
      where: { isVisible: false, isDefault: false },
      relations: ['applicant.user'],
    });

    return data;
  }

  findOne(uuid: string) {
    try {
      return safeQuery(() => this.resumeRepo.findOne({ where: { id: uuid } }));
    } catch {
      throw new BadRequestException(customHttpException.DATABASE_OPERATION_FAILED);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} talent`;
  }
}

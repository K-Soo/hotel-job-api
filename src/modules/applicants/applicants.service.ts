import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Applicant } from './entities/applicant.entity';
import { safeQuery } from '../../common/helpers/database.helper';
import { Provider, Role } from '../../common/constants/app.enum';
@Injectable()
export class ApplicantsService {
  constructor(@InjectRepository(Applicant) private repo: Repository<Applicant>) {}

  async create(userId: string) {
    const user = await safeQuery(async () =>
      this.repo.create({ userId, provider: Provider.KAKAO, role: Role.JOB_SEEKER }),
    );
    return this.repo.save(user);
  }

  findAll() {
    return `This action returns all applicants`;
  }

  async findOne(id: string) {
    const applicant = await safeQuery(() => this.repo.findOne({ where: { id: id }, relations: ['consent'] }));
    return applicant;
  }

  findByUserId(userId: string) {
    return safeQuery(() => this.repo.findOne({ where: { userId: userId } }));
  }

  findByUuid(uuid: string) {
    return safeQuery(() => this.repo.findOne({ where: { id: uuid } }));
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Applicant } from './entities/applicant.entity';
import { safeQuery } from '../../common/helpers/database.helper';
import { ProviderRole, UserRole } from '../../common/constants/app.enum';
@Injectable()
export class ApplicantsService {
  constructor(@InjectRepository(Applicant) private repo: Repository<Applicant>) {}

  async create(userId: number) {
    const user = await safeQuery(async () => this.repo.create({ userId, provider: ProviderRole.KAKAO, role: UserRole.JOB_SEEKER }));
    return this.repo.save(user);
  }

  findAll() {
    return `This action returns all applicants`;
  }

  findOne(id: string) {
    return safeQuery(() => this.repo.findOne({ where: { id: id } }));
  }

  findOneUserId(userId: number) {
    return safeQuery(() => this.repo.findOne({ where: { userId: userId } }));
  }
}

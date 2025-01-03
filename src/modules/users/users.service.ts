import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { safeQuery } from '../../common/helpers/database.helper';
import { Applicant } from '../applicants/entities/applicant.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(applicant: Applicant, email: string) {
    const user = await safeQuery(async () => this.userRepo.create({ applicant, email }));
    return this.userRepo.save(user);
  }

  async findOne(uuid: string) {
    const user = await this.userRepo.findOne({
      where: { applicant: { id: uuid } },
      relations: ['applicant', 'applicant.consent'],
    });

    return user;
  }
}

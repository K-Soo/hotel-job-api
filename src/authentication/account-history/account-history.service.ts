import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { AccountHistory } from './entities/account-history.entity';
import { Applicant } from '../../modules/applicants/entities/applicant.entity';
import { Employer } from '../../modules/employers/entities/employer.entity';
import { AccountStatus, Role } from '../../common/constants/app.enum';

@Injectable()
export class AccountHistoryService {
  constructor() {}

  // 계정 상태 변경
  async createAccountHistoryWithTransaction(
    entity: Applicant | Employer,
    newStatus: AccountStatus,
    manager: EntityManager,
    reason?: string,
  ) {
    const accountHistoryRepo = manager.getRepository(AccountHistory);

    const createdHistory = accountHistoryRepo.create({
      status: newStatus,
      userId: entity.userId,
      phone: entity?.certification?.phone_no ?? null,
      di: entity?.certification?.di ?? null,
      userRole: entity instanceof Applicant ? Role.JOB_SEEKER : Role.EMPLOYER,
      reason,
      registeredAt: entity.createdAt,
    });

    await accountHistoryRepo.save(createdHistory);
  }
}

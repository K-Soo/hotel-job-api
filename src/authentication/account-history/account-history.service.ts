import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { AccountHistory } from './entities/account-history.entity';
import { Applicant } from '../../modules/applicants/entities/applicant.entity';
import { Employer } from '../../modules/employers/entities/employer.entity';
import { AccountStatus } from '../../common/constants/app.enum';

@Injectable()
export class AccountHistoryService {
  constructor(
    @InjectRepository(AccountHistory)
    private readonly accountHistoryRepo: Repository<AccountHistory>,

    @InjectRepository(Applicant)
    private readonly applicantRepo: Repository<Applicant>,

    @InjectRepository(Employer)
    private readonly employerRepo: Repository<Employer>,
  ) {}

  // async deleteOldHistories(retentionDays: number) {
  //   const thresholdDate = new Date();
  //   thresholdDate.setDate(thresholdDate.getDate() - retentionDays);

  //   await this.statusHistoryRepo.delete({
  //     changedAt: LessThan(thresholdDate),
  //   });
  // }

  // 계정 상태 변경
  async createAccountHistory(entity: Applicant | Employer, newStatus: AccountStatus, userId: string, reason?: string) {
    const createdHistory = this.accountHistoryRepo.create({
      applicant: entity instanceof Applicant ? entity : null,
      employer: entity instanceof Employer ? entity : null,
      status: newStatus,
      userId,
      reason,
    });

    await this.accountHistoryRepo.save(createdHistory);

    entity.accountStatus = newStatus;

    if (entity instanceof Applicant) {
      await this.applicantRepo.save(entity);
    }

    if (entity instanceof Employer) {
      await this.employerRepo.save(entity);
    }
  }

  // Applicant 상태 변경 이력 조회
  async getStatusHistoryForApplicant(applicantId: string) {
    return this.accountHistoryRepo.find({
      where: { applicant: { id: applicantId } },
      order: { changedAt: 'DESC' },
    });
  }

  // Employer 상태 변경 이력 조회
  async getStatusHistoryForEmployer(employerId: string) {
    return this.accountHistoryRepo.find({
      where: { employer: { id: employerId } },
      order: { changedAt: 'DESC' },
    });
  }
}

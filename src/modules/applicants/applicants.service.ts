import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Applicant } from './entities/applicant.entity';
import { safeQuery } from '../../common/helpers/database.helper';
import { AccountStatus, Provider, Role } from '../../common/constants/app.enum';
import { ResponseStatus } from '../../common/constants/responseStatus';
import { AccountHistoryService } from '../../authentication/account-history/account-history.service';
import { handleAccountStatus } from '../../common/helpers/account.helper';
@Injectable()
export class ApplicantsService {
  constructor(
    @InjectRepository(Applicant) private repo: Repository<Applicant>,
    private readonly accountHistoryService: AccountHistoryService,
  ) {}

  async create(userId: string, email: string, provider: Provider) {
    const user = await safeQuery(async () => this.repo.create({ userId, provider, email, role: Role.JOB_SEEKER }));
    return this.repo.save(user);
  }

  // 유저 정보, 인증정보, 동의항목 찾기
  async findOne(id: string) {
    const applicant = await safeQuery(() =>
      this.repo.findOne({ where: { id: id }, relations: ['consent', 'certification'] }),
    );
    return applicant;
  }

  // 소셜 계정 고유 id로 유저 찾기
  async findByUserId(userId: string) {
    const user = await safeQuery(() => this.repo.findOne({ where: { userId: userId } }));

    if (user) {
      handleAccountStatus(user.accountStatus);
    }

    return user;
  }

  // uuid로 유저 찾기
  findByUuid(uuid: string) {
    return safeQuery(() => this.repo.findOne({ where: { id: uuid } }));
  }

  async existsApplicantNickname(nickname: string) {
    const applicant = await this.repo
      .createQueryBuilder('applicant')
      .where('applicant.nickname = :nickname', { nickname })
      .getOne();

    return !!applicant;
  }

  updateNickname(id: string, nickname: string) {
    return this.repo.update({ id }, { nickname });
  }

  // 계정 삭제 요청
  async deactivatedForApplicant(uuid: string) {
    const applicant = await safeQuery(() => this.repo.findOne({ where: { id: uuid } }));

    await this.accountHistoryService.createAccountHistory(applicant, AccountStatus.DEACTIVATED, applicant.userId);

    return { status: ResponseStatus.SUCCESS };
  }
}

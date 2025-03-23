import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Applicant } from './entities/applicant.entity';
import { safeQuery } from '../../common/helpers/database.helper';
import { AccountStatus, Provider, Role } from '../../common/constants/app.enum';
import { ResponseStatus } from '../../common/constants/responseStatus';
import { AccountHistoryService } from '../../authentication/account-history/account-history.service';
import { handleAccountStatus } from '../../common/helpers/account.helper';
import { DataSource } from 'typeorm';
import { customHttpException } from '../../common/constants/custom-http-exception';
import { PushService } from '../notifications/push/push.service';
@Injectable()
export class ApplicantsService {
  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(Applicant) private repo: Repository<Applicant>,
    private readonly accountHistoryService: AccountHistoryService,
    private readonly pushService: PushService,
  ) {}

  async create(userId: string, email: string, provider: Provider) {
    const user = await safeQuery(async () => this.repo.create({ userId, provider, email, role: Role.JOB_SEEKER }));
    return this.repo.save(user);
  }

  // 유저 정보, 인증정보, 동의항목 찾기
  async findOne(id: string) {
    const applicant = await safeQuery(() => this.repo.findOne({ where: { id: id }, relations: ['consent'] }));
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
  async withdrawUserForApplicant(uuid: string) {
    return await this.dataSource.transaction(async (manager) => {
      const applicantRepo = manager.getRepository(Applicant);

      const applicant = await applicantRepo.findOne({
        where: { id: uuid },
        relations: ['certification'],
      });

      if (!applicant) {
        throw new NotFoundException(customHttpException.NOT_FOUND_USER);
      }

      // push token 삭제
      await this.pushService.removeUserWithTransaction(applicant.id, manager);

      // 계정 삭제
      await applicantRepo.delete({ id: applicant.id });

      // 히스토리 생성
      await this.accountHistoryService.createAccountHistoryWithTransaction(
        applicant,
        AccountStatus.WITHDRAW,
        manager,
        '회원 탈퇴',
      );

      return { status: ResponseStatus.SUCCESS };
    });
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DataSource } from 'typeorm';
import { Recruitment } from '../../modules/employers/recruitment/entities/recruitment.entity';
import { RecruitmentStatus } from '../../common/constants/recruitment';

@Injectable()
export class CleanupPaymentsScheduler {
  private readonly logger = new Logger(CleanupPaymentsScheduler.name);

  constructor(private readonly dataSource: DataSource) {}

  // @Cron('*/10 * * * * *')
  // async testRecruitment() {
  //   this.logger.log('🔔 [스케줄러 실행] 마감된 채용공고 처리 시작');
  // }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async closeExpiredRecruitment() {
    this.logger.log('🔔 [스케줄러 실행] 마감된 채용공고 처리 시작');
    const now = new Date().toISOString();

    const expiredRecruitment = await this.dataSource
      .createQueryBuilder(Recruitment, 'recruitment')
      .where('recruitment.recruitmentStatus = :status', { status: RecruitmentStatus.PROGRESS })
      .andWhere('recruitment.postingEndDate IS NOT NULL')
      .andWhere('recruitment.postingEndDate < :now', { now })
      .getMany();

    this.logger.log(`🔎 마감 대상 채용공고 수: ${expiredRecruitment.length}`);

    expiredRecruitment.forEach((recruit) => this.logger.log(`➡️ - 마감일: ${recruit.postingEndDate}`));

    for (const recruitment of expiredRecruitment) {
      try {
        await this.dataSource.transaction(async (manager) => {
          recruitment.recruitmentStatus = RecruitmentStatus.CLOSED;
          await manager.save(recruitment);
        });

        this.logger.log(`✅ 성공: 마감 처리된 공고 ID: ${recruitment.id}`);
      } catch (error) {
        this.logger.error(`❌ 실패: 공고 ID ${recruitment.id} 마감 처리 중 오류 발생 - ${error.message}`);
      }
    }

    this.logger.log('🎯 모든 채용공고 마감 처리 완료');
  }
}

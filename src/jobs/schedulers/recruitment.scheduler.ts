import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DataSource } from 'typeorm';
import { Recruitment } from '../../modules/employers/recruitment/entities/recruitment.entity';
import { RecruitmentStatus } from '../../common/constants/recruitment';
import { RecruitmentProductOptionName } from '../../common/constants/product';
import { PaymentStatus } from '../../common/constants/payment';

@Injectable()
export class RecruitmentScheduler {
  private readonly logger = new Logger(RecruitmentScheduler.name);

  constructor(private readonly dataSource: DataSource) {}

  @Cron(CronExpression.EVERY_6_HOURS)
  async updateListUpRecruitment() {
    this.logger.log('🕒 [스케줄러 실행] 공고 최상단 끌어올림 시작');
    const now = new Date();

    const recruitment = await this.dataSource
      .createQueryBuilder(Recruitment, 'recruitment')
      .leftJoinAndSelect('recruitment.paymentRecruitment', 'paymentRecruitment')
      .leftJoinAndSelect('paymentRecruitment.payment', 'payment')
      .leftJoinAndSelect('paymentRecruitment.options', 'options')
      .where('recruitment.recruitmentStatus = :status', { status: RecruitmentStatus.PROGRESS })
      .andWhere('recruitment.isListUp = :isListUp', { isListUp: true })
      .andWhere('recruitment.listUpCount <= :maxListUpCount', { maxListUpCount: 4 })
      .andWhere('payment.paymentStatus = :paymentStatus', { paymentStatus: PaymentStatus.PAYMENT_COMPLETED })
      .orderBy('recruitment.priorityDate', 'DESC')
      .getMany();

    if (recruitment.length === 0) {
      this.logger.log('[스케줄러 종료] 끌어올릴 채용 공고 없음');
      return;
    }

    for (const [index, recruitmentItem] of recruitment.entries()) {
      const validPaymentRecruitment = recruitmentItem.paymentRecruitment?.find((pr) => pr.options);

      const listUpProductOption = validPaymentRecruitment.options.find(
        (o) => o.name === RecruitmentProductOptionName.LIST_UP,
      );

      if (!listUpProductOption) {
        continue;
      }

      // 리스트업 만료된 공고는 스킵
      if (listUpProductOption.postingEndDate < now) {
        console.log(
          '리스트업 만료:',
          recruitmentItem.recruitmentTitle,
          new Date(listUpProductOption.postingEndDate).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
        );

        continue;
      }

      console.log(
        '리스트업 가능: ',
        recruitmentItem.recruitmentTitle,
        `| 만료일 ${recruitmentItem.priorityDate.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}`,
      );

      // 순회 시 1초씩 늘려가며 맨 마지막 공고부터 최상단으로 끌어올림
      const newPriorityDate = new Date(now.getTime() + index * 1000);

      recruitmentItem.priorityDate = newPriorityDate;
      recruitmentItem.listUpCount += 1;
      await this.dataSource.getRepository(Recruitment).save(recruitmentItem);
    }

    this.logger.log(`🕒 [스케줄러 종료] 채용 공고 끌어올림 완료`);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async closeExpiredRecruitment() {
    this.logger.log('🕒 [스케줄러 실행] 마감된 채용공고 처리 시작');
    const now = new Date().toISOString();

    const expiredRecruitment = await this.dataSource
      .createQueryBuilder(Recruitment, 'recruitment')
      .where('recruitment.recruitmentStatus = :status', { status: RecruitmentStatus.PROGRESS })
      .andWhere('recruitment.postingEndDate IS NOT NULL')
      .andWhere('recruitment.postingEndDate < :now', { now })
      .getMany();

    this.logger.log(`마감 대상 채용공고 수: ${expiredRecruitment.length}`);

    expiredRecruitment.forEach((recruit) => this.logger.log(`➡️ - 마감일: ${recruit.postingEndDate}`));

    for (const recruitment of expiredRecruitment) {
      try {
        await this.dataSource.transaction(async (manager) => {
          recruitment.recruitmentStatus = RecruitmentStatus.CLOSED;
          await manager.save(recruitment);
        });

        this.logger.log(`[스케줄러 성공]: 마감 처리된 공고 ID: ${recruitment.id}`);
      } catch (error) {
        this.logger.error(`[스케줄러 실패]: 공고 ID ${recruitment.id} 마감 처리 중 오류 발생 - ${error.message}`);
      }
    }

    this.logger.log('🕒 [스케줄러 종료] 채용공고 마감 처리 완료');
  }
}

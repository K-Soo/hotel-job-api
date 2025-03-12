import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { RecruitQueryDto } from './dto/recruit-query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recruitment } from '../employers/recruitment/entities/recruitment.entity';
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { formatPagination } from '../../common/helpers/pagination.helper';
import { PaymentStatus, PaymentType } from '../../common/constants/payment';
import { RecruitmentProductType, RecruitmentProductName } from '../../common/constants/product';
import { RecruitmentStatus } from '../../common/constants/recruitment';
import { Payment } from '../payment/entities/payment.entity';

@Injectable()
export class RecruitService {
  constructor(
    @InjectRepository(Recruitment) private readonly recruitmentRepo: Repository<Recruitment>,
    @InjectRepository(Payment) private readonly paymentRepo: Repository<Payment>,
  ) {}

  /**
   * 스페셜 채용
   */
  async getSpecialRecruit(filters: RecruitQueryDto) {
    const { page, limit, type, job } = filters;

    const optionPagination: IPaginationOptions = { page, limit };

    try {
      const paymentIds = await this.paymentRepo
        .createQueryBuilder('payment')
        .select('payment.id')
        .where('payment.paymentStatus = :status', { status: PaymentStatus.PAYMENT_COMPLETED })
        .getMany()
        .then((payments) => payments.map((p) => p.id));

      const query = this.recruitmentRepo.createQueryBuilder('recruitment');

      query.innerJoin(
        'recruitment.paymentRecruitment',
        'paymentRecruitment',
        `paymentRecruitment.payment_id IN (:...paymentIds) 
           AND paymentRecruitment.type = :type 
           AND paymentRecruitment.name = :name`,
        { paymentIds, type, name: RecruitmentProductName.SPECIAL },
      );

      query.leftJoinAndSelect('paymentRecruitment.options', 'options');

      query
        .select([
          'recruitment.id',
          'recruitment.recruitmentTitle',
          'recruitment.experienceCondition',
          'recruitment.hotelName',
          'recruitment.employmentType',
          'recruitment.salaryAmount',
          'recruitment.salaryType',
          'recruitment.jobs',
          'recruitment.address',
          'recruitment.addressDetail',
          'recruitment.priorityDate',
          'recruitment.recruitmentStatus',
          'recruitment.postingStartDate',
          'recruitment.postingEndDate',

          'paymentRecruitment',

          'options.id',
          'options.name',
          'options.postingEndDate',
          'options.duration',
          'options.bonusDays',
          'options.listUpIntervalHours',
          'options.maxListUpPerDay',
        ])
        .where('recruitment.recruitmentStatus = :status', { status: RecruitmentStatus.PROGRESS });

      if (job !== undefined && job.length > 0) {
        query.andWhere('recruitment.jobs && ARRAY[:...job]::recruitment_jobs_enum[]', { job });
      }

      query.orderBy('recruitment.priorityDate', 'DESC');

      const paginatedItems = await query
        .offset((page - 1) * limit)
        .limit(limit)
        .getMany();

      const totalCount = await query.getCount();

      return {
        items: paginatedItems,
        pagination: {
          itemCount: paginatedItems.length,
          itemsPerPage: limit,

          totalItems: totalCount,
          totalPages: Math.ceil(totalCount / limit),

          nextPage: page < Math.ceil(totalCount / limit) ? page + 1 : null,
          prevPage: page > 1 ? page - 1 : null,
          currentPage: page,
        },
      };
    } catch (error) {
      console.log('error: ', error?.message);
      throw new InternalServerErrorException();
    }
  }

  /**
   * 급구 채용
   */
  async getUrgentRecruit(filters: RecruitQueryDto) {
    const { page, limit, type, job } = filters;

    try {
      const paymentIds = await this.paymentRepo
        .createQueryBuilder('payment')
        .select('payment.id')
        .where('payment.paymentStatus = :status', { status: PaymentStatus.PAYMENT_COMPLETED })
        .andWhere('payment.paymentType = :paymentType', { paymentType: PaymentType.RECRUITMENT })
        .getMany()
        .then((payments) => payments.map((p) => p.id));

      const query = this.recruitmentRepo
        .createQueryBuilder('recruitment')
        .innerJoin(
          'recruitment.paymentRecruitment',
          'paymentRecruitment',
          `
          paymentRecruitment.payment_id IN (:...paymentIds)
          AND paymentRecruitment.type = :type
          AND paymentRecruitment.name = :name 
        `,
          { paymentIds, type, name: RecruitmentProductName.URGENT },
        )
        .leftJoinAndSelect('paymentRecruitment.options', 'options')
        .select([
          'recruitment.id',
          'recruitment.recruitmentTitle',
          'recruitment.experienceCondition',
          'recruitment.hotelName',
          'recruitment.employmentType',
          'recruitment.salaryAmount',
          'recruitment.salaryType',
          'recruitment.jobs',
          'recruitment.address',
          'recruitment.addressDetail',
          'recruitment.priorityDate',
          'recruitment.recruitmentStatus',
          'recruitment.postingStartDate',
          'recruitment.postingEndDate',

          'paymentRecruitment',

          'options.id',
          'options.name',
          'options.postingEndDate',
          'options.duration',
          'options.bonusDays',
          'options.listUpIntervalHours',
          'options.maxListUpPerDay',
        ])
        .where('recruitment.recruitmentStatus = :status', { status: RecruitmentStatus.PROGRESS });

      if (job !== undefined && job.length > 0) {
        query.andWhere('recruitment.jobs && ARRAY[:...job]::recruitment_jobs_enum[]', { job });
      }

      query.orderBy('recruitment.priorityDate', 'DESC');

      const paginatedItems = await query
        .offset((page - 1) * limit)
        .limit(limit)
        .getMany();

      const totalCount = await query.getCount();

      return {
        items: paginatedItems,
        pagination: {
          itemCount: paginatedItems.length,
          itemsPerPage: limit,

          totalItems: totalCount,
          totalPages: Math.ceil(totalCount / limit),

          nextPage: page < Math.ceil(totalCount / limit) ? page + 1 : null,
          prevPage: page > 1 ? page - 1 : null,
          currentPage: page,
        },
      };
    } catch (error) {
      console.log('error: ', error?.message);
      throw new InternalServerErrorException();
    }
  }

  /**
   * 기본 공고
   * @description CLOSE 상태의 채용공고 포함해서 노출 및 스페셜, 급구 결제한 상품도 기본에 포함해서 노출
   */
  async getBasicRecruit(filters: RecruitQueryDto) {
    const { page, limit, type, job } = filters;

    try {
      const paymentIds = await this.paymentRepo
        .createQueryBuilder('payment')
        .select('payment.id')
        .where('payment.paymentStatus = :status', { status: PaymentStatus.PAYMENT_COMPLETED })
        .andWhere('payment.paymentType = :paymentType', { paymentType: PaymentType.RECRUITMENT })
        .getMany()
        .then((payments) => payments.map((p) => p.id));

      const query = this.recruitmentRepo
        .createQueryBuilder('recruitment')
        .innerJoin(
          'recruitment.paymentRecruitment',
          'paymentRecruitment',
          `
          paymentRecruitment.payment_id IN (:...paymentIds)
          AND paymentRecruitment.type = :type
        `,
          { paymentIds, type },
        )
        .leftJoinAndSelect('paymentRecruitment.options', 'options')
        .select([
          'recruitment.id',
          'recruitment.recruitmentTitle',
          'recruitment.experienceCondition',
          'recruitment.hotelName',
          'recruitment.employmentType',
          'recruitment.salaryAmount',
          'recruitment.salaryType',
          'recruitment.jobs',
          'recruitment.address',
          'recruitment.addressDetail',
          'recruitment.priorityDate',
          'recruitment.recruitmentStatus',
          'paymentRecruitment.type',
          'paymentRecruitment.name',
          'options.id',
          'options.name',
          'options.postingEndDate',
          'options.duration',
          'options.bonusDays',
          'options.listUpIntervalHours',
          'options.maxListUpPerDay',
        ])
        .where('recruitment.recruitmentStatus IN (:...statuses)', {
          statuses: [RecruitmentStatus.PROGRESS, RecruitmentStatus.CLOSED],
        });

      if (job !== undefined && job.length > 0) {
        query.andWhere('recruitment.jobs && ARRAY[:...job]::recruitment_jobs_enum[]', { job });
      }

      // 정렬용 필드를 먼저 선택 ACS에러 방지
      query
        .addSelect(
          `
        CASE 
          WHEN recruitment.recruitmentStatus = '${RecruitmentStatus.PROGRESS}' THEN 1 
          WHEN recruitment.recruitmentStatus = '${RecruitmentStatus.CLOSED}' THEN 2 
          ELSE 3 
        END`,
          'status_order',
        )
        .orderBy('status_order', 'ASC')
        .addOrderBy('recruitment.priorityDate', 'DESC');

      const paginatedItems = await query
        .offset((page - 1) * limit)
        .limit(limit)
        .getMany();

      const totalCount = await query.getCount();

      return {
        items: paginatedItems,

        pagination: {
          itemCount: paginatedItems.length,
          itemsPerPage: limit,

          totalItems: totalCount,
          totalPages: Math.ceil(totalCount / limit),

          nextPage: page < Math.ceil(totalCount / limit) ? page + 1 : null,
          prevPage: page > 1 ? page - 1 : null,
          currentPage: page,
        },
      };
    } catch (error) {
      console.log('error: ', error?.message);
      throw new InternalServerErrorException();
    }
  }

  async getRecruitDetail(id: string) {
    const recruit = await this.recruitmentRepo.findOne({ where: { id }, relations: ['nationality'] });

    if (!recruit) {
      throw new BadRequestException();
    }

    // 비공개 처리 로직
    const { isEmailPrivate, isNamePrivate, isNumberPrivate } = recruit;

    return {
      ...recruit,
      managerEmail: isEmailPrivate ? '비공개' : recruit.managerEmail,
      managerName: isNamePrivate ? '비공개' : recruit.managerName,
      managerNumber: isNumberPrivate ? '비공개' : recruit.managerNumber,
    };
  }
}

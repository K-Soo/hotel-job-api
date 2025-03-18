import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { RecruitQueryDto } from './dto/recruit-query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recruitment } from '../employers/recruitment/entities/recruitment.entity';
import { PaymentStatus, PaymentType } from '../../common/constants/payment';
import { RecruitmentProductName } from '../../common/constants/product';
import { RecruitmentStatus } from '../../common/constants/recruitment';
import { Payment } from '../payment/entities/payment.entity';

@Injectable()
export class RecruitService {
  private readonly logger = new Logger(RecruitService.name);

  constructor(
    @InjectRepository(Recruitment) private readonly recruitmentRepo: Repository<Recruitment>,
    @InjectRepository(Payment) private readonly paymentRepo: Repository<Payment>,
  ) {}

  async progressRecruitIds(): Promise<string[]> {
    try {
      const recruitment = await this.recruitmentRepo
        .createQueryBuilder('recruitment')
        .select('recruitment.id')
        .where('recruitment.recruitmentStatus = :status', { status: RecruitmentStatus.PROGRESS })
        .getMany();

      console.log('recruitment: ', recruitment);

      return recruitment.map((recruitment) => recruitment.id);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async premium(filters: RecruitQueryDto) {
    const { page, limit, type, job } = filters;
    try {
      const paymentIds = await this.paymentRepo
        .createQueryBuilder('payment')
        .select('payment.id')
        .where('payment.paymentStatus = :status', { status: PaymentStatus.PAYMENT_COMPLETED })
        .andWhere('payment.paymentType = :paymentType', { paymentType: PaymentType.RECRUITMENT })
        .getMany()
        .then((payments) => payments.map((p) => p.id));

      const baseQuery = this.recruitmentRepo
        .createQueryBuilder('recruitment')
        .innerJoin(
          'recruitment.paymentRecruitment',
          'paymentRecruitment',
          `
          paymentRecruitment.payment_id IN (:...paymentIds)
          AND paymentRecruitment.type = :type
          AND paymentRecruitment.name = :name 
        `,
          { paymentIds, type, name: RecruitmentProductName.PREMIUM },
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
          'recruitment.recruitmentStatus',

          'recruitment.priorityDate',
          'recruitment.postingStartDate',
          'recruitment.postingEndDate',

          'paymentRecruitment.type',
          'paymentRecruitment.name',
          'paymentRecruitment.duration',
          'paymentRecruitment.bonusDays',

          `COALESCE(
            json_agg(
              json_build_object(
                'id', options.id,
                'name', options.name,
                'postingEndDate', options.postingEndDate,
                'duration', options.duration,
                'bonusDays', options.bonusDays,
                'listUpIntervalHours', options.listUpIntervalHours,
                'maxListUpPerDay', options.max_list_up_per_day
              )
            ) FILTER (WHERE options.id IS NOT NULL), '[]'::json
          ) AS options`,
        ])
        .addSelect(`array_to_json(recruitment.jobs)`, 'recruitment_jobs')
        .where('recruitment.recruitmentStatus = :status', { status: RecruitmentStatus.PROGRESS })
        .groupBy('recruitment.id')
        .addGroupBy('paymentRecruitment.id')
        .addOrderBy('recruitment.priorityDate', 'DESC');

      if (job !== undefined && job.length > 0) {
        baseQuery.andWhere('recruitment.jobs && ARRAY[:...job]::recruitment_jobs_enum[]', { job });
      }

      const [rawPaginatedItems, totalCount] = await Promise.all([
        baseQuery
          .clone()
          .offset((page - 1) * limit)
          .limit(limit)
          .getRawMany(),
        baseQuery.clone().getCount(),
      ]);

      const paginatedItems = rawPaginatedItems.map((item) => ({
        id: item.recruitment_id,
        recruitmentTitle: item.recruitment_recruitment_title,
        experienceCondition: item.recruitment_experience_condition,
        hotelName: item.recruitment_hotel_name,
        employmentType: item.recruitment_employment_type,
        salaryAmount: item.recruitment_salary_amount,
        salaryType: item.recruitment_salary_type,
        jobs: item.recruitment_jobs,
        address: item.recruitment_address,
        addressDetail: item.recruitment_address_detail,
        recruitmentStatus: item.recruitment_recruitment_status,
        priorityDate: item.recruitment_priority_date,
        postingStartDate: item.recruitment_posting_start_date,
        postingEndDate: item.recruitment_posting_end_date,
        paymentRecruitment: {
          type: item.paymentRecruitment_type,
          name: item.paymentRecruitment_name,
          duration: Number(item.paymentRecruitment_duration),
          bonusDays: item.paymentRecruitment_bonus_days,
          options: item.options,
        },
      }));

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
   * 스페셜 채용
   */
  async special(filters: RecruitQueryDto) {
    const { page, limit, type, job } = filters;

    try {
      const paymentIds = await this.paymentRepo
        .createQueryBuilder('payment')
        .select('payment.id')
        .where('payment.paymentStatus = :status', { status: PaymentStatus.PAYMENT_COMPLETED })
        .andWhere('payment.paymentType = :paymentType', { paymentType: PaymentType.RECRUITMENT })
        .getMany()
        .then((payments) => payments.map((p) => p.id));

      const baseQuery = this.recruitmentRepo
        .createQueryBuilder('recruitment')
        .innerJoin(
          'recruitment.paymentRecruitment',
          'paymentRecruitment',
          `
          paymentRecruitment.payment_id IN (:...paymentIds)
          AND paymentRecruitment.type = :type
          AND paymentRecruitment.name = :name 
        `,
          { paymentIds, type, name: RecruitmentProductName.SPECIAL },
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
          'recruitment.recruitmentStatus',

          'recruitment.priorityDate',
          'recruitment.postingStartDate',
          'recruitment.postingEndDate',

          'paymentRecruitment.type',
          'paymentRecruitment.name',
          'paymentRecruitment.duration',
          'paymentRecruitment.bonusDays',

          `COALESCE(
            json_agg(
              json_build_object(
                'id', options.id,
                'name', options.name,
                'postingEndDate', options.postingEndDate,
                'duration', options.duration,
                'bonusDays', options.bonusDays,
                'listUpIntervalHours', options.listUpIntervalHours,
                'maxListUpPerDay', options.max_list_up_per_day
              )
            ) FILTER (WHERE options.id IS NOT NULL), '[]'::json
          ) AS options`,
        ])
        .addSelect(`array_to_json(recruitment.jobs)`, 'recruitment_jobs')
        .where('recruitment.recruitmentStatus = :status', { status: RecruitmentStatus.PROGRESS })
        .groupBy('recruitment.id')
        .addGroupBy('paymentRecruitment.id')
        .addOrderBy('recruitment.priorityDate', 'DESC');

      if (job !== undefined && job.length > 0) {
        baseQuery.andWhere('recruitment.jobs && ARRAY[:...job]::recruitment_jobs_enum[]', { job });
      }

      const [rawPaginatedItems, totalCount] = await Promise.all([
        baseQuery
          .clone()
          .offset((page - 1) * limit)
          .limit(limit)
          .getRawMany(),
        baseQuery.clone().getCount(),
      ]);

      const paginatedItems = rawPaginatedItems.map((item) => ({
        id: item.recruitment_id,
        recruitmentTitle: item.recruitment_recruitment_title,
        experienceCondition: item.recruitment_experience_condition,
        hotelName: item.recruitment_hotel_name,
        employmentType: item.recruitment_employment_type,
        salaryAmount: item.recruitment_salary_amount,
        salaryType: item.recruitment_salary_type,
        jobs: item.recruitment_jobs,
        address: item.recruitment_address,
        addressDetail: item.recruitment_address_detail,
        recruitmentStatus: item.recruitment_recruitment_status,
        priorityDate: item.recruitment_priority_date,
        postingStartDate: item.recruitment_posting_start_date,
        postingEndDate: item.recruitment_posting_end_date,
        paymentRecruitment: {
          type: item.paymentRecruitment_type,
          name: item.paymentRecruitment_name,
          duration: Number(item.paymentRecruitment_duration),
          bonusDays: item.paymentRecruitment_bonus_days,
          options: item.options,
        },
      }));

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
  async urgent(filters: RecruitQueryDto) {
    const { page, limit, type, job } = filters;

    try {
      const paymentIds = await this.paymentRepo
        .createQueryBuilder('payment')
        .select('payment.id')
        .where('payment.paymentStatus = :status', { status: PaymentStatus.PAYMENT_COMPLETED })
        .andWhere('payment.paymentType = :paymentType', { paymentType: PaymentType.RECRUITMENT })
        .getMany()
        .then((payments) => payments.map((p) => p.id));

      const baseQuery = this.recruitmentRepo
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
          'recruitment.recruitmentStatus',

          'recruitment.priorityDate',
          'recruitment.postingStartDate',
          'recruitment.postingEndDate',

          'paymentRecruitment.type',
          'paymentRecruitment.name',
          'paymentRecruitment.duration',
          'paymentRecruitment.bonusDays',

          `COALESCE(
            json_agg(
              json_build_object(
                'id', options.id,
                'name', options.name,
                'postingEndDate', options.postingEndDate,
                'duration', options.duration,
                'bonusDays', options.bonusDays,
                'listUpIntervalHours', options.listUpIntervalHours,
                'maxListUpPerDay', options.max_list_up_per_day
              )
            ) FILTER (WHERE options.id IS NOT NULL), '[]'::json
          ) AS options`,
        ])
        .addSelect(`array_to_json(recruitment.jobs)`, 'recruitment_jobs')
        .where('recruitment.recruitmentStatus = :status', { status: RecruitmentStatus.PROGRESS })
        .groupBy('recruitment.id')
        .addGroupBy('paymentRecruitment.id')
        .addOrderBy('recruitment.priorityDate', 'DESC');

      if (job !== undefined && job.length > 0) {
        baseQuery.andWhere('recruitment.jobs && ARRAY[:...job]::recruitment_jobs_enum[]', { job });
      }

      const [rawPaginatedItems, totalCount] = await Promise.all([
        baseQuery
          .clone()
          .offset((page - 1) * limit)
          .limit(limit)
          .getRawMany(),
        baseQuery.clone().getCount(),
      ]);

      const paginatedItems = rawPaginatedItems.map((item) => ({
        id: item.recruitment_id,
        recruitmentTitle: item.recruitment_recruitment_title,
        experienceCondition: item.recruitment_experience_condition,
        hotelName: item.recruitment_hotel_name,
        employmentType: item.recruitment_employment_type,
        salaryAmount: item.recruitment_salary_amount,
        salaryType: item.recruitment_salary_type,
        jobs: item.recruitment_jobs,
        address: item.recruitment_address,
        addressDetail: item.recruitment_address_detail,
        recruitmentStatus: item.recruitment_recruitment_status,
        priorityDate: item.recruitment_priority_date,
        postingStartDate: item.recruitment_posting_start_date,
        postingEndDate: item.recruitment_posting_end_date,
        paymentRecruitment: {
          type: item.paymentRecruitment_type,
          name: item.paymentRecruitment_name,
          duration: Number(item.paymentRecruitment_duration),
          bonusDays: item.paymentRecruitment_bonus_days,
          options: item.options,
        },
      }));

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
      this.logger.error(`getUrgentRecruit: ${error.message}`);

      throw new InternalServerErrorException();
    }
  }

  /**
   * 기본 공고
   * @description CLOSE 상태의 채용공고 포함해서 노출 및 스페셜, 급구 결제한 상품도 기본에 포함해서 노출
   */
  async basic(filters: RecruitQueryDto) {
    const { page, limit, type, job } = filters;

    try {
      const paymentIds = await this.paymentRepo
        .createQueryBuilder('payment')
        .select('payment.id')
        .where('payment.paymentStatus = :status', { status: PaymentStatus.PAYMENT_COMPLETED })
        .andWhere('payment.paymentType = :paymentType', { paymentType: PaymentType.RECRUITMENT })
        .getMany()
        .then((payments) => payments.map((p) => p.id));

      const baseQuery = this.recruitmentRepo
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
          'recruitment.recruitmentStatus',

          'recruitment.priorityDate',
          'recruitment.postingStartDate',
          'recruitment.postingEndDate',

          'paymentRecruitment.type',
          'paymentRecruitment.name',
          'paymentRecruitment.duration',
          'paymentRecruitment.bonusDays',

          `COALESCE(
            json_agg(
              json_build_object(
                'id', options.id,
                'name', options.name,
                'postingEndDate', options.postingEndDate,
                'duration', options.duration,
                'bonusDays', options.bonusDays,
                'listUpIntervalHours', options.listUpIntervalHours,
                'maxListUpPerDay', options.max_list_up_per_day
              )
            ) FILTER (WHERE options.id IS NOT NULL), '[]'::json
          ) AS options`,
        ])
        .addSelect(`array_to_json(recruitment.jobs)`, 'recruitment_jobs')
        .where('recruitment.recruitmentStatus IN (:...statuses)', {
          statuses: [RecruitmentStatus.PROGRESS, RecruitmentStatus.CLOSED],
        })
        .groupBy('recruitment.id')
        .addGroupBy('paymentRecruitment.id')
        .orderBy('recruitment.id', 'ASC');

      if (job !== undefined && job.length > 0) {
        baseQuery.andWhere('recruitment.jobs && ARRAY[:...job]::recruitment_jobs_enum[]', { job });
      }

      baseQuery
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

      const [rawPaginatedItems, totalCount] = await Promise.all([
        baseQuery
          .clone()
          .offset((page - 1) * limit)
          .limit(limit)
          .getRawMany(),
        baseQuery.clone().getCount(),
      ]);

      const paginatedItems = rawPaginatedItems.map((item) => ({
        id: item.recruitment_id,
        recruitmentTitle: item.recruitment_recruitment_title,
        experienceCondition: item.recruitment_experience_condition,
        hotelName: item.recruitment_hotel_name,
        employmentType: item.recruitment_employment_type,
        salaryAmount: item.recruitment_salary_amount,
        salaryType: item.recruitment_salary_type,
        jobs: item.recruitment_jobs,
        address: item.recruitment_address,
        addressDetail: item.recruitment_address_detail,
        recruitmentStatus: item.recruitment_recruitment_status,
        priorityDate: item.recruitment_priority_date,
        postingStartDate: item.recruitment_posting_start_date,
        postingEndDate: item.recruitment_posting_end_date,
        paymentRecruitment: {
          type: item.paymentRecruitment_type,
          name: item.paymentRecruitment_name,
          duration: Number(item.paymentRecruitment_duration),
          bonusDays: item.paymentRecruitment_bonus_days,
          options: item.options,
        },
      }));

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
      this.logger.error(`getBasicRecruit: ${error.message}`);

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

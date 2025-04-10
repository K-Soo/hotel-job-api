import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { DraftRecruitmentDto } from './dto/draft-recruitment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recruitment } from './entities/recruitment.entity';
import { Repository } from 'typeorm';
import { RecruitmentStatus, RecruitmentQueryStatus } from '../../../common/constants/recruitment';
import { dateFormat } from '../../../common/utils/dateFormat';
import { RecruitmentQueryDto } from './dto/recruitment-query.dto';
import { customHttpException } from '../../../common/constants/custom-http-exception';
import { Employer } from '../../employers/entities/employer.entity';
import { DataSource, In } from 'typeorm';
import { Nationality } from './entities/nationality.entity';
import { ResponseStatus } from '../../../common/constants/responseStatus';
import { cloneDeep, isEqual } from 'lodash';
import { PaymentStatus } from '../../../common/constants/payment';

@Injectable()
export class RecruitmentService {
  constructor(
    @InjectRepository(Recruitment) private recruitmentRepo: Repository<Recruitment>,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * 채용공고 생성
   */
  async create(createRecruitmentDto: CreateRecruitmentDto, employer: Employer) {
    const recruitmentCount = await this.recruitmentRepo.count({
      where: { employer: { id: employer.id } },
    });

    if (recruitmentCount >= 100) {
      throw new BadRequestException(customHttpException.CREATION_LIMIT_EXCEEDED);
    }

    return this.dataSource.transaction(async (manager) => {
      const { recruitmentInfo } = createRecruitmentDto;
      const { nationality, ...restRecruitmentInfo } = recruitmentInfo;

      const recruitmentRepo = manager.getRepository(Recruitment);
      const nationalityRepo = manager.getRepository(Nationality);

      // 새로 생성
      if (!createRecruitmentDto.id) {
        const nationalityEntity = nationalityRepo.create(nationality);

        const recruitmentEntity = recruitmentRepo.create({
          recruitmentTitle: createRecruitmentDto.recruitmentTitle,
          recruitmentStatus: createRecruitmentDto.recruitmentStatus,
          ...restRecruitmentInfo,
          nationality: nationalityEntity,
          content: createRecruitmentDto.content,
          ...createRecruitmentDto.conditionInfo,
          ...createRecruitmentDto.locationInfo,
          ...createRecruitmentDto.managerInfo,
          employer,
        });

        await recruitmentRepo.save(recruitmentEntity);

        return { status: ResponseStatus.SUCCESS };
      }

      // 임시저장 공고 생성
      if (createRecruitmentDto.id) {
        const existingRecruitment = await recruitmentRepo.findOne({
          where: { id: createRecruitmentDto.id },
          relations: ['nationality'],
        });

        if (!existingRecruitment) {
          throw new Error('Recruitment not found.');
        }

        const updatedData = {
          recruitmentTitle: createRecruitmentDto.recruitmentTitle,
          recruitmentStatus: RecruitmentStatus.PUBLISHED,
          ...recruitmentInfo,
          content: createRecruitmentDto.content,
          ...createRecruitmentDto.conditionInfo,
          ...createRecruitmentDto.locationInfo,
          ...createRecruitmentDto.managerInfo,
        };

        const updatedRecruitment = this.recruitmentRepo.merge(existingRecruitment, updatedData);

        await this.recruitmentRepo.save(updatedRecruitment);

        return { status: ResponseStatus.SUCCESS };
      }
    });
  }

  /**
   *  채용공고 수정
   */
  update(createRecruitmentDto: CreateRecruitmentDto, userUuid: string) {
    const { recruitmentInfo } = createRecruitmentDto;
    return this.dataSource.transaction(async (manager) => {
      const recruitmentRepo = manager.getRepository(Recruitment);

      const existingRecruitment = await recruitmentRepo.findOne({
        where: { id: createRecruitmentDto.id, employer: { id: userUuid } },
        relations: ['nationality'],
      });

      if (!existingRecruitment) {
        throw new Error('Recruitment not found.');
      }

      const updatedData = {
        recruitmentTitle: createRecruitmentDto.recruitmentTitle,
        recruitmentStatus: createRecruitmentDto.recruitmentStatus,
        ...recruitmentInfo,
        content: createRecruitmentDto.content,
        ...createRecruitmentDto.conditionInfo,
        ...createRecruitmentDto.locationInfo,
        ...createRecruitmentDto.managerInfo,
      };

      const updatedRecruitment = this.recruitmentRepo.merge(existingRecruitment, updatedData);

      await this.recruitmentRepo.save(updatedRecruitment);

      return { status: ResponseStatus.SUCCESS };
    });
  }

  /**
   *  채용공고 임시저장
   *  DRAFT 상태로 저장
   * @description 채용공고를 임시저장합니다. 처음 저장하는 경우 새로 생성하고, 기존 공고가 있는 경우 업데이트합니다.
   */
  async draft(draftRecruitmentDto: DraftRecruitmentDto, employer: Employer) {
    return this.dataSource.transaction(async (manager) => {
      const { recruitmentInfo } = draftRecruitmentDto;
      const { nationality, ...restRecruitmentInfo } = recruitmentInfo;

      const recruitmentRepo = manager.getRepository(Recruitment);
      const nationalityRepo = manager.getRepository(Nationality);

      const nationalityEntity = nationalityRepo.create(nationality);

      const defaultTitle = `[임시저장] ${dateFormat.current()}`;

      // 기존 공고가 없는 경우 새로 생성
      if (!draftRecruitmentDto.id) {
        const recruitmentEntity = recruitmentRepo.create({
          recruitmentTitle: draftRecruitmentDto.recruitmentTitle || defaultTitle,
          recruitmentStatus: draftRecruitmentDto.recruitmentStatus,
          ...restRecruitmentInfo,
          nationality: nationalityEntity,
          content: draftRecruitmentDto.content,
          ...draftRecruitmentDto.conditionInfo,
          ...draftRecruitmentDto.locationInfo,
          ...draftRecruitmentDto.managerInfo,
          employer,
        });

        const savedRecruitment = await this.recruitmentRepo.save(recruitmentEntity);

        return { status: ResponseStatus.SUCCESS, id: savedRecruitment.id };
      }

      // 기존 공고가 있는 경우 업데이트
      if (draftRecruitmentDto.id) {
        const existingRecruitment = await this.recruitmentRepo.findOne({
          where: { id: draftRecruitmentDto.id },
          relations: ['nationality'],
        });

        if (!existingRecruitment) {
          throw new Error('Recruitment not found.');
        }

        const updatedData = {
          ...existingRecruitment,
          recruitmentTitle: draftRecruitmentDto.recruitmentTitle || defaultTitle,
          recruitmentStatus: RecruitmentStatus.DRAFT,
          ...recruitmentInfo,
          content: draftRecruitmentDto.content,
          ...draftRecruitmentDto.conditionInfo,
          ...draftRecruitmentDto.locationInfo,
          ...draftRecruitmentDto.managerInfo,
        };

        const updatedRecruitment = this.recruitmentRepo.merge(existingRecruitment, updatedData);

        console.log('Objects are equal:', isEqual(existingRecruitment, updatedRecruitment));
        function getChangedFields(obj1: object, obj2: object): object {
          const changes = {};
          for (const key in obj1) {
            if (obj1[key] !== obj2[key]) {
              changes[key] = { before: obj1[key], after: obj2[key] };
            }
          }
          return changes;
        }

        const changes = getChangedFields(existingRecruitment, updatedData);
        console.log('Changed fields:', changes);

        // 변경된 필드 확인
        // const changes = getChangedFields(existingRecruitment, updatedData);
        // console.log('Changed fields:', changes);

        const savedRecruitment = await this.recruitmentRepo.save(updatedRecruitment);
        return savedRecruitment;
      }

      return { status: ResponseStatus.SUCCESS };
    });
  }

  /**
   * 채용공고 목록
   */
  async recruitmentList(recruitmentQueryDto: RecruitmentQueryDto, uuid: string) {
    const { page, limit, status } = recruitmentQueryDto;

    const offset = (page - 1) * limit;

    const totalItemsQuery = this.recruitmentRepo
      .createQueryBuilder('recruitment')
      .innerJoin('recruitment.employer', 'employer')
      .where('employer.id = :uuid', { uuid });

    if (status !== RecruitmentQueryStatus.ALL) {
      totalItemsQuery.andWhere('recruitment.recruitmentStatus = :status', { status: RecruitmentStatus[status] });
    }

    const totalItems = await totalItemsQuery.getCount();

    const recruitmentIdsQuery = this.recruitmentRepo
      .createQueryBuilder('recruitment')
      .select('recruitment.id')
      .innerJoin('recruitment.employer', 'employer')
      .where('employer.id = :uuid', { uuid })
      .orderBy('recruitment.createdAt', 'DESC')
      .offset(offset)
      .limit(limit);

    if (status !== RecruitmentQueryStatus.ALL) {
      recruitmentIdsQuery.andWhere('recruitment.recruitmentStatus = :status', { status: RecruitmentStatus[status] });
    }

    const queryBuilder = this.recruitmentRepo
      .createQueryBuilder('recruitment')
      .leftJoinAndSelect('recruitment.applications', 'applications')
      .leftJoinAndSelect(
        'recruitment.paymentRecruitment',
        'paymentRecruitment',
        'EXISTS (SELECT 1 FROM payment p WHERE p.id = paymentRecruitment.payment AND p.payment_status = :paymentCompleted)',
      )
      .leftJoinAndSelect('paymentRecruitment.options', 'options')
      .where('recruitment.id IN (' + recruitmentIdsQuery.getQuery() + ')')
      .setParameters({
        ...recruitmentIdsQuery.getParameters(),
        paymentCompleted: PaymentStatus.PAYMENT_COMPLETED, // 추가된 파라미터
      })
      .orderBy('recruitment.createdAt', 'DESC');

    queryBuilder.select([
      'recruitment.id',
      'applications',
      'recruitment.createdAt',
      'recruitment.updatedAt',
      'recruitment.jobs',
      'recruitment.postingEndDate',
      'recruitment.postingStartDate',
      'recruitment.recruitmentStatus',
      'recruitment.recruitmentTitle',
      'paymentRecruitment',
      'options',
    ]);

    const paginatedResult = await queryBuilder.getMany();

    // 각 채용공고의 applications을 카운트
    const formattedItems = paginatedResult.map((recruitment) => {
      const totalApplications = recruitment.applications.length;
      const viewedApplications = recruitment.applications.filter((app) => app.isView).length;
      const notViewedApplications = totalApplications - viewedApplications;
      const paymentRecruitment = recruitment.paymentRecruitment.length > 0 ? recruitment.paymentRecruitment[0] : null;

      return {
        ...recruitment,
        paymentRecruitment,
        applicationCount: {
          totalCount: totalApplications,
          viewCount: viewedApplications,
          notViewCount: notViewedApplications,
        },
        // applications 배열을 제거
        applications: undefined,
      };
    });

    return {
      items: formattedItems,
      pagination: {
        itemCount: paginatedResult.length,
        itemsPerPage: limit,

        totalItems: totalItems,
        totalPages: Math.ceil(totalItems / limit),

        nextPage: page < Math.ceil(totalItems / limit) ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null,
        currentPage: page,
      },
    };
  }

  publishedRecruitmentList(uuid: string) {
    return this.recruitmentRepo.find({
      where: { recruitmentStatus: RecruitmentStatus.PUBLISHED, employer: { id: uuid } },
    });
  }

  // findOneRecruitment - 채용공고 상세
  async findOneRecruitment(id: string, uuid: string) {
    const existingRecruitment = await this.recruitmentRepo.findOne({
      where: { id, employer: { id: uuid } },
      relations: ['nationality'],
    });

    if (!existingRecruitment) {
      throw new NotFoundException();
    }

    return {
      id: existingRecruitment.id,
      recruitmentTitle: existingRecruitment.recruitmentTitle,
      recruitmentStatus: existingRecruitment.recruitmentStatus,
      recruitmentInfo: {
        jobs: existingRecruitment.jobs,
        experienceCondition: existingRecruitment.experienceCondition,
        nationality: existingRecruitment.nationality,
        recruitmentCapacity: existingRecruitment.recruitmentCapacity,
        educationCondition: existingRecruitment.educationCondition,
        position: existingRecruitment.position,
        department: existingRecruitment.department,
        preferences: existingRecruitment.preferences,
      },
      content: existingRecruitment.content,
      conditionInfo: {
        employmentType: existingRecruitment.employmentType,
        salaryType: existingRecruitment.salaryType,
        salaryAmount: existingRecruitment.salaryAmount,
        workingDay: existingRecruitment.workingDay,
        workingTime: existingRecruitment.workingTime,
        benefits: existingRecruitment.benefits,
      },
      locationInfo: {
        hotelName: existingRecruitment.hotelName,
        roomCount: existingRecruitment.roomCount,
        address: existingRecruitment.address,
        addressDetail: existingRecruitment.addressDetail,
      },
      managerInfo: {
        managerName: existingRecruitment.managerName,
        isNamePrivate: existingRecruitment.isNamePrivate,
        managerNumber: existingRecruitment.managerNumber,
        isNumberPrivate: existingRecruitment.isNumberPrivate,
        managerEmail: existingRecruitment.managerEmail,
        isEmailPrivate: existingRecruitment.isEmailPrivate,
      },
      updateAt: existingRecruitment.updatedAt,
    };
  }

  // recruitmentStatus - 채용공고 상태별 수량 집계
  async recruitmentStatus(uuid: string) {
    const allStatuses = Object.values(RecruitmentStatus);

    try {
      const result = await this.recruitmentRepo
        .createQueryBuilder('recruitment')
        .select('recruitment.recruitmentStatus', 'status')
        .addSelect('COALESCE(COUNT(recruitment.id), 0)', 'count') // 수량이 없으면 0으로
        .innerJoin('recruitment.employer', 'employer') // employer와 조인
        .where('employer.id = :uuid', { uuid })
        .groupBy('recruitment.recruitmentStatus')
        .getRawMany();

      const statusCounts = result.reduce((acc, { status, count }) => ({ ...acc, [status]: parseInt(count, 10) }), {});

      // 모든 상태를 포함하여 누락된 상태는 0으로 설정
      const completeStatusCounts = allStatuses.reduce(
        (acc, status) => ({ ...acc, [status]: statusCounts[status] || 0 }),
        {},
      );

      const totalCount = (Object.values(completeStatusCounts) as number[]).reduce((sum, count) => sum + count, 0);

      return { ALL: totalCount, ...completeStatusCounts };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * 특정 채용공고의 지원자 수 카운트
   */
  async getApplicationCountByRecruitmentId(recruitmentId: string, userId: string) {
    const recruitment = await this.recruitmentRepo.findOne({
      where: { id: recruitmentId, employer: { id: userId } },
      relations: ['applications'],
    });

    if (!recruitment) {
      throw new NotFoundException('해당 채용공고를 찾을 수 없습니다.');
    }

    const applications = recruitment.applications;

    const totalCount = applications.length;
    const viewCount = applications.filter((app) => app.isView).length;
    const notViewCount = totalCount - viewCount;

    return {
      recruitmentStatus: recruitment.recruitmentStatus,
      totalCount,
      viewCount,
      notViewCount,
    };
  }

  removeRecruitment(ids: string[], userUuid: string) {
    return this.dataSource.transaction(async (manager) => {
      const recruitmentRepo = manager.getRepository(Recruitment);

      const recruitmentToDelete = await recruitmentRepo.findBy({
        id: In(ids),
        employer: { id: userUuid },
      });

      if (recruitmentToDelete.length !== ids.length) {
        throw new NotFoundException('Some recruitment IDs were not found.');
      }

      // PROGRESS 또는 CLOSED 상태의 레코드 확인
      const restrictedRecruitment = recruitmentToDelete.filter(
        (recruitment) =>
          recruitment.recruitmentStatus === RecruitmentStatus.PROGRESS ||
          recruitment.recruitmentStatus === RecruitmentStatus.CLOSED,
      );

      if (restrictedRecruitment.length > 0) {
        throw new BadRequestException(
          customHttpException.BAD_REQUEST_REMOVE('Progress recruitment cannot be deleted.'),
        );
      }

      await recruitmentRepo.delete(ids);

      return {
        status: ResponseStatus.SUCCESS,
      };
    });
  }

  /**
   *
   * 공고 마감
   */
  closedRecruitment(recruitmentId: string, userId: string) {
    return this.dataSource.transaction(async (manager) => {
      const recruitmentRepo = manager.getRepository(Recruitment);

      const recruitment = await recruitmentRepo.findOne({
        where: { id: recruitmentId, employer: { id: userId } },
      });

      if (!recruitment) {
        throw new NotFoundException();
      }

      if (recruitment.recruitmentStatus !== 'PROGRESS') {
        throw new BadRequestException(customHttpException.BAD_REQUEST_REMOVE('마감할 수 없는 공고입니다.'));
      }

      recruitment.recruitmentStatus = RecruitmentStatus.CLOSED;

      await recruitmentRepo.save(recruitment);

      return {
        status: ResponseStatus.SUCCESS,
      };
    });
  }

  /**
   *
   * 공고 복사
   */
  async copyRecruitment(recruitmentId: string, userId: string) {
    try {
      const recruitmentCount = await this.recruitmentRepo.count({
        where: { employer: { id: userId } },
      });

      if (recruitmentCount >= 100) {
        throw new BadRequestException(customHttpException.CREATION_LIMIT_EXCEEDED);
      }

      const existingRecruitment = await this.recruitmentRepo.findOne({
        where: { id: recruitmentId, employer: { id: userId } },
        relations: ['nationality'],
      });

      console.log('existingRecruitment: ', existingRecruitment);

      if (!existingRecruitment) {
        throw new BadRequestException('Recruitment not found.');
      }

      const { recruitmentStatus } = existingRecruitment;

      if (recruitmentStatus === RecruitmentStatus.DRAFT || recruitmentStatus === RecruitmentStatus.REVIEWING) {
        throw new BadRequestException('Cannot copy draft recruitment.');
      }

      const copiedRecruitment = cloneDeep(existingRecruitment);

      const newNationality = { ...existingRecruitment.nationality, id: undefined };

      const newTitle = `복사 ${dateFormat.date(new Date(), 'YYYY.MM.DD HH:mm')}`;

      const newRecruitment = this.recruitmentRepo.create({
        ...copiedRecruitment,
        nationality: newNationality,
        employer: { id: userId },
        id: undefined,
        recruitmentTitle: newTitle,
        recruitmentStatus: RecruitmentStatus.DRAFT,
        priorityDate: null,
        postingStartDate: null,
        postingEndDate: null,
        listUpCount: 0,
        isListUp: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await this.recruitmentRepo.save(newRecruitment);

      return { status: ResponseStatus.SUCCESS };
    } catch (error) {
      console.log('error: ', error.message);
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new BadRequestException('Error occurred while copying recruitment.');
    }
  }
}

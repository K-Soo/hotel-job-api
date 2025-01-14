import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { DraftRecruitmentDto } from './dto/draft-recruitment.dto';
import { UpdateRecruitmentDto } from './dto/update-recruitment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recruitment } from './entities/recruitment.entity';
import { Repository } from 'typeorm';
import { RecruitmentStatus, RecruitmentQueryStatus } from '../../../common/constants/recruitment';
import { dateFormat } from '../../../common/utils/dateFormat';
import { RecruitmentQueryDto } from './dto/recruitment-query.dto';
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { formatPagination } from '../../../common/helpers/pagination.helper';
import { CryptoService } from '../../../providers/crypto/crypto.service';
import { customHttpException } from '../../../common/constants/custom-http-exception';
import { Employer } from '../../employers/entities/employer.entity';
import { DataSource, In } from 'typeorm';
import { Nationality } from './entities/nationality.entity';
import { ResponseStatus } from '../../../common/constants/responseStatus';
import { isEqual } from 'lodash';

@Injectable()
export class RecruitmentService {
  constructor(
    @InjectRepository(Recruitment) private recruitmentRepo: Repository<Recruitment>,
    private readonly dataSource: DataSource,
  ) {}

  create(createRecruitmentDto: CreateRecruitmentDto, employer: Employer) {
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

  // update - 등록된 채용공고 수정
  update(createRecruitmentDto: CreateRecruitmentDto) {
    return this.dataSource.transaction(async (manager) => {
      const { recruitmentInfo } = createRecruitmentDto;

      const recruitmentRepo = manager.getRepository(Recruitment);

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
    });
  }

  // draft - 임시저장
  async draft(draftRecruitmentDto: DraftRecruitmentDto, employer: Employer) {
    console.log('draftRecruitmentDto: ', draftRecruitmentDto);
    return this.dataSource.transaction(async (manager) => {
      const { recruitmentInfo } = draftRecruitmentDto;
      const { nationality, ...restRecruitmentInfo } = recruitmentInfo;

      const recruitmentRepo = manager.getRepository(Recruitment);
      const nationalityRepo = manager.getRepository(Nationality);

      const nationalityEntity = nationalityRepo.create(nationality);

      const defaultTitle = `[임시저장] ${dateFormat.current()}`;

      // 새로 생성
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

      // 업데이트
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

  // findAll - 채용공고 목록
  async findAll(recruitmentQueryDto: RecruitmentQueryDto, uuid: string) {
    const { page, limit, status } = recruitmentQueryDto;

    const options: IPaginationOptions = { page, limit };

    const statusCondition =
      status === RecruitmentQueryStatus.ALL ? {} : { recruitmentStatus: RecruitmentStatus[status] };

    const paginatedResult = await paginate<Recruitment>(this.recruitmentRepo, options, {
      where: { ...statusCondition, employer: { id: uuid } },
      order: { createdAt: 'DESC' },
    });

    return formatPagination(paginatedResult);
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

  removeMultiple(ids: string[], userUuid: string) {
    return this.dataSource.transaction(async (manager) => {
      const recruitmentRepo = manager.getRepository(Recruitment);

      const recruitmentToDelete = await recruitmentRepo.findBy({
        id: In(ids),
        employer: { id: userUuid },
      });

      if (recruitmentToDelete.length !== ids.length) {
        throw new NotFoundException('Some recruitment IDs were not found.');
      }

      // PROGRESS 상태의 레코드 확인
      const progressRecruitment = recruitmentToDelete.filter(
        (recruitment) => recruitment.recruitmentStatus === 'PROGRESS',
      );

      if (progressRecruitment.length > 0) {
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
}

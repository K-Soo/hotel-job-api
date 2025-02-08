import { BadRequestException, Injectable } from '@nestjs/common';
import { RecruitQueryDto } from './dto/recruit-query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recruitment } from '../employers/recruitment/entities/recruitment.entity';
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { formatPagination } from '../../common/helpers/pagination.helper';

@Injectable()
export class RecruitService {
  constructor(
    @InjectRepository(Recruitment)
    private readonly recruitRepository: Repository<Recruitment>,
  ) {}

  async getRecruitment(type: 'special' | 'urgent' | 'basic', filters: RecruitQueryDto) {
    const { page, limit } = filters;

    const options: IPaginationOptions = { page, limit };

    const query = this.recruitRepository.createQueryBuilder('recruit');
    query.select([
      'recruit.id',
      'recruit.recruitmentTitle',
      'recruit.experienceCondition',
      'recruit.hotelName',
      // 'recruit.recruitmentStatus',
      'recruit.employmentType',
      'recruit.salaryAmount',
      'recruit.salaryType',
      'recruit.updatedAt',
      'recruit.createdAt',
      'recruit.jobs',
      'recruit.salaryAmount',
      'recruit.address',
      'recruit.addressDetail',
    ]);

    query.where('recruit.recruitmentStatus = :status', { status: 'PROGRESS' });

    console.log('filters.jobs: ', filters.jobs);
    if (filters.jobs) {
      console.log('filters.jobs: ', filters.jobs);
    }

    const paginatedResult = await paginate(query, options);

    return formatPagination(paginatedResult);
  }

  async getRecruitDetail(id: string) {
    const recruit = await this.recruitRepository.findOne({ where: { id }, relations: ['nationality'] });

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

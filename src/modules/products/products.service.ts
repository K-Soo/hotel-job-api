import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecruitmentProduct } from './entities/recruitment.entity';
import { RecruitmentProductType } from '../../common/constants/product';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(RecruitmentProduct)
    private readonly recruitmentProductRepository: Repository<RecruitmentProduct>,
  ) {}

  // 채용 상품 목록 조회
  async findRecruitmentProducts() {
    const products = await this.recruitmentProductRepository.find({
      where: { type: RecruitmentProductType.RECRUIT },
      relations: ['durations', 'options'],
    });

    return products;
  }
}

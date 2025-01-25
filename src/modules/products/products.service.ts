import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecruitmentProduct } from './entities/recruitment.entity';
import { RecruitmentProductQueryDto } from './dto/recruitment-product-query.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(RecruitmentProduct)
    private readonly recruitmentProductRepository: Repository<RecruitmentProduct>,
  ) {}

  // 채용 상품 목록 조회
  async findRecruitmentProducts(query: RecruitmentProductQueryDto) {
    const products = await this.recruitmentProductRepository.find({
      where: { type: query.type },
      relations: ['durations', 'options'],
    });

    return products;
  }
}

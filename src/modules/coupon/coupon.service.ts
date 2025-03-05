import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from './entities/coupon.entity';
import { EmployerCoupon } from './entities/employer-coupon.entity';
import { Employer } from '../employers/entities/employer.entity';
import { COUPON_CODE_LIST, COUPON_DESCRIPTION } from '../../common/constants/coupon';
import { dateFormat } from '../../common/utils/dateFormat';
import { ResponseStatus } from '../../common/constants/responseStatus';
import { CreateEmployerCouponDto } from './dto/create-employer-coupon.dto';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepo: Repository<Coupon>,
    @InjectRepository(EmployerCoupon)
    private readonly employerCouponRepo: Repository<EmployerCoupon>,
    @InjectRepository(Employer)
    private readonly employerRepo: Repository<Employer>,
  ) {}

  /**
   * 회원가입 시 웰컴 쿠폰 발급
   */
  async assignWelcomeCoupon(employer: Employer) {
    const welcomeCoupon = await this.couponRepo.findOne({
      where: { code: COUPON_CODE_LIST.WELCOME_BASIC_10_DAYS },
    });

    if (!welcomeCoupon) {
      throw new NotFoundException(`웰컴 쿠폰이 존재하지 않습니다.`);
    }

    const existingCoupon = await this.employerCouponRepo.findOne({
      where: { employer, coupon: { id: welcomeCoupon.id } },
    });

    if (existingCoupon) {
      throw new ConflictException(`이미 웰컴 쿠폰이 발급되었습니다.`);
    }

    const firstDayOfMonth = dateFormat.getFirstDayOfMonth();

    const lastDayOfMonth = dateFormat.getLastDayOfMonth();

    const employerCoupon = this.employerCouponRepo.create({
      employer,
      coupon: welcomeCoupon,
      description: COUPON_DESCRIPTION.WELCOME_BASIC_10_DAYS,
      isUsed: false,
      issuedAt: firstDayOfMonth,
      expiresAt: lastDayOfMonth,
    });

    await this.employerCouponRepo.save(employerCoupon);

    return { status: ResponseStatus.SUCCESS };
  }

  /**
   * 쿠폰 리스트
   */
  async getCouponsByEmployer(employerId: string, isUsed: boolean = false) {
    const queryBuilder = this.employerCouponRepo
      .createQueryBuilder('employerCoupon')
      .leftJoinAndSelect('employerCoupon.coupon', 'coupon')
      .where('employerCoupon.employer_id = :employerId', { employerId });

    queryBuilder.andWhere('employerCoupon.isUsed = :isUsed', { isUsed });

    const coupons = await queryBuilder.orderBy('employerCoupon.createdAt', 'DESC').getMany();

    const data = coupons.map((item) => {
      return {
        id: item.id,
        discountType: item.coupon.discountType,
        discountRate: item.coupon.discountRate,
        discountAmount: item.coupon.discountAmount,
        expiresAt: item.expiresAt,
        isUsed: item.isUsed,
        description: item.description,
        minOrderAmount: item.coupon.minOrderAmount,
        maxDiscountAmount: item.coupon.maxDiscountAmount,
      };
    });

    return data;
  }

  /**
   * 특정 사용자에게 수동으로 쿠폰 발급
   */
  async assignCouponToEmployer(dto: CreateEmployerCouponDto) {
    const { employerId, couponCode, description, expiresAt } = dto;

    // 1️. 사용자 존재 여부 확인
    const employer = await this.employerRepo.findOne({ where: { id: employerId } });
    if (!employer) {
      throw new NotFoundException('해당 사용자를 찾을 수 없습니다.');
    }

    // 2️. 쿠폰 존재 여부 확인
    const coupon = await this.couponRepo.findOne({ where: { code: couponCode } });

    if (!coupon) {
      throw new NotFoundException('해당 쿠폰을 찾을 수 없습니다.');
    }

    // 3 이미 발급된 쿠폰인지 확인 관리자권한 중복쿠폰 발급가능
    // const existingCoupon = await this.employerCouponRepo.findOne({
    //   where: { employer, coupon },
    // });

    // if (existingCoupon) {
    //   throw new ConflictException('이미 해당 쿠폰이 발급되었습니다.');
    // }

    const createdCoupon = this.employerCouponRepo.create({
      employer,
      coupon,
      description: description,
      isUsed: false,
      issuedAt: new Date(),
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    });

    await this.employerCouponRepo.save(createdCoupon);

    return { status: ResponseStatus.SUCCESS };
  }
}

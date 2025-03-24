import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from './entities/coupon.entity';
import { EmployerCoupon } from './entities/employer-coupon.entity';
import { Employer } from '../employers/entities/employer.entity';
import { COUPON_CODE_LIST, COUPON_DESCRIPTION } from '../../common/constants/coupon';
import { dateFormat } from '../../common/utils/dateFormat';
import { ResponseStatus } from '../../common/constants/responseStatus';
import { CreateEmployerCouponDto } from './dto/create-employer-coupon.dto';
import { ConfigService } from '@nestjs/config';
import { NotificationService } from '../notifications/notifications.service';
import { CategoryType, NotificationType } from '../../common/constants/notification';
import { CreateCouponDto } from './dto/create-coupon.dto';

@Injectable()
export class CouponService {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly configService: ConfigService,
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
   * 쿠폰 생성
   */
  async createCoupon(createCouponDto: CreateCouponDto) {
    const { employerUserId, secretKey } = createCouponDto;

    const adminSecretKey = this.configService.get('ADMIN_SECRET_KEY');

    if (adminSecretKey !== secretKey) {
      throw new UnauthorizedException('인증 실패');
    }

    const employer = await this.employerRepo.findOne({ where: { userId: employerUserId } });

    if (!employer) {
      throw new NotFoundException('해당 사용자를 찾을 수 없습니다.');
    }

    const coupon = await this.couponRepo.findOne({ where: { code: createCouponDto.code } });

    if (coupon) {
      throw new NotFoundException('이미 존재하는 쿠폰 코드입니다.');
    }

    const create = this.couponRepo.create({
      code: createCouponDto.code,
      discountType: createCouponDto.discountType,
      discountRate: createCouponDto.discountRate,
      discountAmount: createCouponDto.discountAmount,
      minOrderAmount: createCouponDto.minOrderAmount,
      maxDiscountAmount: createCouponDto.maxDiscountAmount,
      isSingleUse: createCouponDto.isSingleUse,
      isPublic: createCouponDto.isPublic,
    });

    await this.couponRepo.save(create);

    return { status: ResponseStatus.SUCCESS };
  }

  /**
   * 특정 사용자에게 수동으로 쿠폰 발급
   */
  async assignCouponToEmployer(createEmployerCouponDto: CreateEmployerCouponDto) {
    const { employerUserId, couponCode, description, expiresAt, secretKey } = createEmployerCouponDto;

    const adminSecretKey = this.configService.get('ADMIN_SECRET_KEY');

    if (adminSecretKey !== secretKey) {
      throw new UnauthorizedException('인증 실패');
    }

    const employer = await this.employerRepo.findOne({ where: { userId: employerUserId } });

    if (!employer) {
      throw new NotFoundException('해당 사용자를 찾을 수 없습니다.');
    }

    const coupon = await this.couponRepo.findOne({ where: { code: couponCode } });

    if (!coupon) {
      throw new NotFoundException('해당 쿠폰을 찾을 수 없습니다.');
    }

    // 관리자권한으로 수동 발급은 중복 허용할까
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

    await this.notificationService.sendNotification({
      category: CategoryType.EVENT,
      title: '',
      link: `/employer`,
      userIds: [employer.id],
      message: `${description}이 발급되었습니다.`,
      notificationType: [NotificationType.IN_APP, NotificationType.PUSH],
    });

    return { status: ResponseStatus.SUCCESS };
  }
}

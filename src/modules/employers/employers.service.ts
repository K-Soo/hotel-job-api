import { CreateEmployerDto } from './dto/create-employer.dto';
import { HttpException, Injectable, HttpStatus, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employer } from './entities/employer.entity';
import { hashPassword, comparePassword } from '../../common/helpers/password.helper';
import { safeQuery } from '../../common/helpers/database.helper';
import { EntityManager, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Membership } from '../membership/entities/membership.entity';

@Injectable()
export class EmployersService {
  constructor(
    @InjectRepository(Employer) private readonly employerRepo: Repository<Employer>,
    @InjectRepository(Membership)
    private readonly membershipRepo: Repository<Membership>,
  ) {}

  //회원가입 시 Employer 생성 및 Membership 설정
  async create(createEmployerDto: CreateEmployerDto, manager: EntityManager) {
    const isExistUser = await this.findOneUserId(createEmployerDto.userId);
    if (isExistUser) {
      throw new ConflictException('User ID already exists');
    }

    const hashedPassword = await hashPassword(createEmployerDto.password);

    const defaultScore = 0;
    const membership = await this.findMembershipByScore(defaultScore);

    if (!membership) {
      throw new HttpException('Unable to assign a Membership for the default score.', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const user = this.employerRepo.create({
      ...createEmployerDto,
      password: hashedPassword,
      membership,
    });

    return manager.save(Employer, user);
  }

  // 유저 아이디로 유저 찾기
  findOneUserId(userId: string) {
    return safeQuery(() => this.employerRepo.findOne({ where: { userId } }));
  }

  // 유저 uuid로 유저 찾기
  findOneUuid(id: string) {
    if (!id) {
      return null;
    }
    return safeQuery(() => this.employerRepo.findOne({ where: { id } }));
  }

  // 계정정보
  accountInfo(id: string) {
    return safeQuery(async () => {
      const account = await this.employerRepo.findOne({ where: { id }, relations: ['membership', 'coupon'] });

      const coupons = account.coupon.filter((coupon) => coupon.isUsed === false);

      return {
        ...account,
        certification: account.certification ?? null,
        availableCouponCount: coupons.length,
      };
    });
  }

  async validateEmployerUser({ userId, password }: { userId: string; password: string }) {
    try {
      const doesExist = await this.findOneUserId(userId);

      if (!doesExist) {
        throw new Error();
      }

      const isPasswordHashValid = await comparePassword(password, doesExist.password);

      if (!isPasswordHashValid) {
        throw new Error();
      }

      return doesExist;
    } catch (_) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} employer`;
  }

  // 점수 기반으로 Membership 찾기
  async findMembershipByScore(score: number): Promise<Membership | null> {
    return this.membershipRepo.findOne({
      where: {
        minScore: LessThanOrEqual(score),
        maxScore: MoreThanOrEqual(score),
      },
    });
  }

  async updateEmployerMemberships(): Promise<void> {}

  async existsEmployerNickname(nickname: string) {
    const employer = await this.employerRepo
      .createQueryBuilder('employer')
      .where('employer.nickname = :nickname', { nickname })
      .getOne();

    return !!employer;
  }

  updateNickname(id: string, nickname: string) {
    return this.employerRepo.update({ id }, { nickname });
  }
}

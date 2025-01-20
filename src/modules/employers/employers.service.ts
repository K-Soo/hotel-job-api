import { CreateEmployerDto } from './dto/create-employer.dto';
import { HttpException, Injectable, HttpStatus, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employer } from './entities/employer.entity';
import { hashPassword, comparePassword } from '../../common/helpers/password.helper';
import { safeQuery } from '../../common/helpers/database.helper';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class EmployersService {
  constructor(@InjectRepository(Employer) private repo: Repository<Employer>) {}

  async create(createEmployerDto: CreateEmployerDto, manager: EntityManager) {
    const isExistUser = await this.findOneUserId(createEmployerDto.userId);
    if (isExistUser) {
      throw new ConflictException('User ID already exists');
    }

    const hashedPassword = await hashPassword(createEmployerDto.password);

    const user = this.repo.create({
      ...createEmployerDto,
      password: hashedPassword,
    });

    return manager.save(Employer, user);
  }

  // 유저 아이디로 유저 찾기
  findOneUserId(userId: string) {
    return safeQuery(() => this.repo.findOne({ where: { userId } }));
  }

  // 유저 uuid로 유저 찾기
  findOneUuid(id: string) {
    return safeQuery(() => this.repo.findOne({ where: { id } }));
  }

  // 계정정보
  accountInfo(id: string) {
    return safeQuery(async () => {
      const account = await this.repo.findOne({ where: { id }, relations: ['certification'] });
      return {
        ...account,
        certification: account.certification ?? null,
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
}

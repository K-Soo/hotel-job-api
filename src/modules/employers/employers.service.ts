import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employer } from './entities/employer.entity';
import { Repository } from 'typeorm';
import { hashPassword } from '../../common/helpers/password.helper';
import { customHttpException } from '../../common/constants/custom-http-exception';
@Injectable()
export class EmployersService {
  constructor(@InjectRepository(Employer) private repo: Repository<Employer>) {}

  async create(createEmployerDto: CreateEmployerDto) {
    const isExistUser = await this.isEmployerUserExists(createEmployerDto.userId);
    if (isExistUser) {
      throw new HttpException('User already exist.', HttpStatus.CONFLICT);
    }
    const hashedPassword = await hashPassword(createEmployerDto.password);

    const user = this.repo.create({
      ...createEmployerDto,
      password: hashedPassword,
    });

    return this.repo.save(user);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  update(id: number, updateEmployerDto: UpdateEmployerDto) {
    return `This action updates a #${id} employer`;
  }

  remove(id: number) {
    return `This action removes a #${id} employer`;
  }

  async isEmployerUserExists(userId: string) {
    try {
      // const user = this.repo.findOne({ where: { userId: userId } });
      const user = await this.repo.query('SELECT non_existing_column FROM users');
      return user;
    } catch (_error: any) {
      throw new HttpException(customHttpException.DATABASE_QUERY_FAILED, HttpStatus.BAD_REQUEST);
    }
  }

  async validateEmployerUser({ userId, password }: { userId: string; password: string }) {
    const doesExist = await this.isEmployerUserExists(userId);
    if (!doesExist) {
      throw new Error('Invalid credentials.');
    }
    const isPasswordHashValid = await hashPassword(password);
    if (!isPasswordHashValid) {
      throw new Error('Invalid credentials.');
    }
    return doesExist;
  }
}

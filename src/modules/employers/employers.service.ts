import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employer } from './entities/employer.entity';
import { Repository } from 'typeorm';
import { hashPassword, comparePassword } from '../../common/helpers/password.helper';
import { safeQuery } from '../../common/helpers/database.helper';
@Injectable()
export class EmployersService {
  constructor(@InjectRepository(Employer) private repo: Repository<Employer>) {}

  async create(createEmployerDto: CreateEmployerDto) {
    const isExistUser = await this.findOne(createEmployerDto.userId);
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

  findOne(id: string) {
    return safeQuery(() => this.repo.findOne({ where: { id } }));
  }

  async validateEmployerUser({ userId, password }: { userId: string; password: string }) {
    try {
      const doesExist = await this.findOne(userId);

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

  findAll() {
    return this.repo.find();
  }

  update(id: number, updateEmployerDto: UpdateEmployerDto) {
    return `This action updates a #${id} employer`;
  }

  remove(id: number) {
    return `This action removes a #${id} employer`;
  }
}

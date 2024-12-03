import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employer } from './entities/employer.entity';
import { Repository } from 'typeorm';
import { hashPassword } from '../../common/helpers/password.helper';
@Injectable()
export class EmployersService {
	constructor(@InjectRepository(Employer) private repo: Repository<Employer>) {}

	async create(createEmployerDto: CreateEmployerDto) {
		console.log();
		const isExistUser = await this.isUserIdExists(createEmployerDto.userId);
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

	async isUserIdExists(userId: string) {
		const user = await this.repo.findOne({ where: { userId: userId } });
		return !!user;
	}
}

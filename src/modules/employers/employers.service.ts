import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { customHttpException } from '../../common/constants/custom-http-exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Employer } from './entities/employer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployersService {
	constructor(@InjectRepository(Employer) private repo: Repository<Employer>) {}

	create(createEmployerDto: CreateEmployerDto) {
		throw new HttpException(customHttpException.INVALID_CREDENTIALS, 404);
	}

	findAll() {
		return `This action returns all employers`;
	}

	findOne(id: number) {
		return `This action returns a #${id} employer`;
	}

	update(id: number, updateEmployerDto: UpdateEmployerDto) {
		return `This action updates a #${id} employer`;
	}

	remove(id: number) {
		return `This action removes a #${id} employer`;
	}
}

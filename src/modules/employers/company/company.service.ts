import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Employer } from '../entities/employer.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Repository } from 'typeorm';
import { safeQuery } from '../../../common/helpers/database.helper';
import { Role, Provider, AccountStatus, VerificationStatus } from '../../../common/constants/app.enum';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRepo: Repository<Company>,
    @InjectRepository(Employer) private employerRepo: Repository<Employer>,
  ) {}

  async create(createCompany: CreateCompanyDto, employer: Employer) {
    const existingCompany = await this.companyRepo.findOne({ where: { employer } });

    if (existingCompany) {
      return { status: 'duplicate' };
    }

    const createdCompany = this.companyRepo.create({ ...createCompany, employer });

    await safeQuery(() => this.companyRepo.save(createdCompany));

    await safeQuery(() =>
      this.employerRepo.update(employer.id, { companyVerificationStatus: VerificationStatus.VERIFIED }),
    );

    return { status: 'success' };
  }

  async findOne(userUuid: string) {
    const existingCompany = await safeQuery(() => this.companyRepo.findOne({ where: { employer: { id: userUuid } } }));
    if (!existingCompany) {
      throw new NotFoundException();
    }
    return existingCompany;
  }
}

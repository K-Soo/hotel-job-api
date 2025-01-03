import { forwardRef, Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { EmployersModule } from '../employers.module';
import { Employer } from '../entities/employer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Employer]), forwardRef(() => EmployersModule)],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}

import { forwardRef, Module } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { EmployersController } from './employers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employer } from './entities/employer.entity';
import { AuthModule } from '../../authentication/auth/auth.module';
import { CompanyModule } from './company/company.module';
import { RecruitmentModule } from './recruitment/recruitment.module';

@Module({
  imports: [TypeOrmModule.forFeature([Employer]), forwardRef(() => AuthModule), CompanyModule, RecruitmentModule],
  controllers: [EmployersController],
  providers: [EmployersService],
  exports: [EmployersService],
})
export class EmployersModule {}

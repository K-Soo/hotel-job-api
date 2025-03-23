import { Module } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { EmployersController } from './employers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employer } from './entities/employer.entity';
import { CompanyModule } from './company/company.module';
import { RecruitmentModule } from './recruitment/recruitment.module';
import { Membership } from '../membership/entities/membership.entity';
import { AccountHistoryModule } from '../../authentication/account-history/account-history.module';
import { PushModule } from '../notifications/push/push.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employer, Membership]),
    AccountHistoryModule,
    CompanyModule,
    RecruitmentModule,
    PushModule,
  ],
  controllers: [EmployersController],
  providers: [EmployersService],
  exports: [EmployersService, TypeOrmModule],
})
export class EmployersModule {}

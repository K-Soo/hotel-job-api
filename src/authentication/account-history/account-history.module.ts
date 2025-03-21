import { forwardRef, Module } from '@nestjs/common';
import { AccountHistoryService } from './account-history.service';
import { AccountHistoryController } from './account-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountHistory } from './entities/account-history.entity';
import { ApplicantsModule } from '../../modules/applicants/applicants.module';
import { Employer } from '../../modules/employers/entities/employer.entity';
import { Applicant } from '../../modules/applicants/entities/applicant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountHistory, Applicant, Employer]), forwardRef(() => ApplicantsModule)],
  controllers: [AccountHistoryController],
  providers: [AccountHistoryService],
  exports: [AccountHistoryService],
})
export class AccountHistoryModule {}

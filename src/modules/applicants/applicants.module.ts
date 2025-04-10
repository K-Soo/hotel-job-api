import { forwardRef, Module } from '@nestjs/common';
import { ApplicantsService } from './applicants.service';
import { ApplicantsController } from './applicants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Applicant } from './entities/applicant.entity';
import { PushModule } from '../notifications/push/push.module';
import { AccountHistoryModule } from '../../authentication/account-history/account-history.module';

@Module({
  imports: [TypeOrmModule.forFeature([Applicant]), forwardRef(() => AccountHistoryModule), PushModule],
  controllers: [ApplicantsController],
  providers: [ApplicantsService],
  exports: [ApplicantsService],
})
export class ApplicantsModule {}

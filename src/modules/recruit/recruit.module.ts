import { Module } from '@nestjs/common';
import { RecruitService } from './recruit.service';
import { RecruitController } from './recruit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recruitment } from '../employers/recruitment/entities/recruitment.entity';
import { Payment } from '../payment/entities/payment.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Recruitment, Payment])],
  controllers: [RecruitController],
  providers: [RecruitService],
})
export class RecruitModule {}

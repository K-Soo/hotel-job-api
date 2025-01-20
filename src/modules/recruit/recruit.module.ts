import { Module } from '@nestjs/common';
import { RecruitService } from './recruit.service';
import { RecruitController } from './recruit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recruitment } from '../employers/recruitment/entities/recruitment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recruitment])],
  controllers: [RecruitController],
  providers: [RecruitService],
})
export class RecruitModule {}

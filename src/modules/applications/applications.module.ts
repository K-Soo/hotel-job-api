import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { Resume } from '../resumes/entities/resume.entity';
import { Recruitment } from '../employers/recruitment/entities/recruitment.entity';
import { ApplicantsModule } from '../applicants/applicants.module';

@Module({
  imports: [TypeOrmModule.forFeature([Application, Resume, Recruitment]), ApplicantsModule],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
})
export class ApplicationsModule {}

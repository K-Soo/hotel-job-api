import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { Resume } from '../resumes/entities/resume.entity';
import { Recruitment } from '../employers/recruitment/entities/recruitment.entity';
import { ApplicantsModule } from '../applicants/applicants.module';
import { EmployersModule } from '../employers/employers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Application, Resume, Recruitment]), ApplicantsModule, EmployersModule],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
})
export class ApplicationsModule {}

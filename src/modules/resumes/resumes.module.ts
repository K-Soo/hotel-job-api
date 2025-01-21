import { Module } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { ResumesController } from './resumes.controller';
import { Resume } from './entities/resume.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantsModule } from '../applicants/applicants.module';
import { ExperiencesModule } from '../experiences/experiences.module';
import { MilitaryModule } from '../military/military.module';
import { CertificationModule } from '../../authentication/certification/certification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Resume]),
    ApplicantsModule,
    ExperiencesModule,
    MilitaryModule,
    CertificationModule,
  ],
  controllers: [ResumesController],
  providers: [ResumesService],
  exports: [ResumesService],
})
export class ResumesModule {}

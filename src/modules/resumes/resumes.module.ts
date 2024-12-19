import { Module } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { ResumesController } from './resumes.controller';
import { Resume } from './entities/resume.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantsModule } from '../applicants/applicants.module';
import { ExperiencesModule } from '../experiences/experiences.module';
import { LicensesModule } from '../licenses/licenses.module';
import { MilitaryModule } from '../military/military.module';

@Module({
  imports: [TypeOrmModule.forFeature([Resume]), ApplicantsModule, ExperiencesModule, LicensesModule, MilitaryModule],
  controllers: [ResumesController],
  providers: [ResumesService],
  exports: [ResumesService],
})
export class ResumesModule {}

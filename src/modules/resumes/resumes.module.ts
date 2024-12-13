import { Module } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { ResumesController } from './resumes.controller';
import { Resume } from './entities/resume.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantsModule } from '../applicants/applicants.module';
@Module({
  imports: [TypeOrmModule.forFeature([Resume]), ApplicantsModule],
  controllers: [ResumesController],
  providers: [ResumesService],
})
export class ResumesModule {}

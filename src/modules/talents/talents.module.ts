import { Module } from '@nestjs/common';
import { TalentsService } from './talents.service';
import { TalentsController } from './talents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resume } from '../resumes/entities/resume.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resume])],
  controllers: [TalentsController],
  providers: [TalentsService],
})
export class TalentsModule {}

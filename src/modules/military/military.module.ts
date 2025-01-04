import { Module } from '@nestjs/common';
import { MilitaryService } from './military.service';
import { MilitaryController } from './military.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Military } from './entities/military.entity';
import { Resume } from '../resumes/entities/resume.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Military]), Resume],
  controllers: [MilitaryController],
  providers: [MilitaryService],
  exports: [MilitaryService],
})
export class MilitaryModule {}

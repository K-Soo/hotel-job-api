import { Module } from '@nestjs/common';
import { CertificationService } from './certification.service';
import { CertificationController } from './certification.controller';
import { SecretsManagerModule } from '../../providers/secrets-manager/secrets-manager.module';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certification } from './entities/certification.entity';
import { EmployersModule } from '../../modules/employers/employers.module';
import { Employer } from '../../modules/employers/entities/employer.entity';
import { ApplicantsModule } from '../../modules/applicants/applicants.module';
import { Applicant } from '../../modules/applicants/entities/applicant.entity';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Certification, Employer, Applicant]),
    SecretsManagerModule,
    AuthModule,
    HttpModule,
    EmployersModule,
    ApplicantsModule,
  ],
  controllers: [CertificationController],
  providers: [CertificationService],
  exports: [CertificationService],
})
export class CertificationModule {}

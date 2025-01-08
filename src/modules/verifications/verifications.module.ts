import { Module } from '@nestjs/common';
import { VerificationsService } from './verifications.service';
import { VerificationsController } from './verifications.controller';
import { EmployersModule } from '../employers/employers.module';
import { CompanyModule } from '../employers/company/company.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [EmployersModule, HttpModule, CompanyModule],
  controllers: [VerificationsController],
  providers: [VerificationsService],
})
export class VerificationsModule {}

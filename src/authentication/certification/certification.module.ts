import { Module } from '@nestjs/common';
import { CertificationService } from './certification.service';
import { CertificationController } from './certification.controller';
import { SecretsManagerModule } from '../../providers/secrets-manager/secrets-manager.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [SecretsManagerModule, HttpModule],
  controllers: [CertificationController],
  providers: [CertificationService],
})
export class CertificationModule {}

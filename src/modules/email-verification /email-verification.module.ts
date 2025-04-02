import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailVerificationController } from './email-verification.controller';
import { EmailVerificationService } from './email-verification.service';
import { EmailVerification } from './entities/email-verification.entity';
import { MailModule } from '../../mail/mail.module';
import { EmployersModule } from '../../modules/employers/employers.module';
import { CryptoModule } from '../../providers/crypto/crypto.module';
@Module({
  imports: [TypeOrmModule.forFeature([EmailVerification]), MailModule, EmployersModule, CryptoModule],
  controllers: [EmailVerificationController],
  providers: [EmailVerificationService],
  exports: [],
})
export class EmailVerificationModule {}

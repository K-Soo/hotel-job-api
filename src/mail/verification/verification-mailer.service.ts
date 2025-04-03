// src/mails/verification/verification-mailer.service.ts
import { Injectable } from '@nestjs/common';
import { MailService } from '../mail.service';
import { VERIFICATION_MAIL_SUBJECT, VERIFICATION_TEMPLATE_NAME } from './verification-mail.constants';

@Injectable()
export class EmailVerificationMailer {
  constructor(private readonly mailService: MailService) {}

  async sendVerificationEmail(to: string, verificationUrl: string) {
    console.log('verificationUrl: ', verificationUrl);
    await this.mailService.sendMail({
      to,
      subject: VERIFICATION_MAIL_SUBJECT, //이메일 제목
      template: VERIFICATION_TEMPLATE_NAME, // 파일이름
      context: {
        verificationUrl,
      },
    });
  }
}

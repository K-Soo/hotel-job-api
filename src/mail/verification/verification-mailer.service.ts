// src/mails/verification/verification-mailer.service.ts
import { Injectable } from '@nestjs/common';
import { MailService } from '../mail.service';
import { VERIFICATION_MAIL_SUBJECT, VERIFICATION_TEMPLATE_NAME } from './verification-mail.constants';

@Injectable()
export class EmailVerificationMailer {
  constructor(private readonly mailService: MailService) {}

  async sendVerificationEmail(to: string, verificationUrl: string) {
    await this.mailService.sendMail({
      to,
      subject: VERIFICATION_MAIL_SUBJECT,
      template: VERIFICATION_TEMPLATE_NAME,
      context: {
        verificationUrl,
      },
    });
  }
}

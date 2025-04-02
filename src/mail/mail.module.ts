import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EmailVerificationMailer } from './verification/verification-mailer.service';
import { existsSync } from 'fs';

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        const templateDir = join(__dirname, 'verification', 'templates');

        const templateConfig = existsSync(templateDir)
          ? {
              dir: templateDir,
              adapter: new HandlebarsAdapter(),
              options: { strict: true },
            }
          : undefined;

        if (!templateConfig) {
          console.warn('[MailModule] 템플릿 디렉토리가 존재하지 않습니다:', templateDir);
        }

        return {
          transport: {
            service: 'gmail',
            auth: {
              user: config.get<string>('EMAIL_USER'),
              pass: config.get<string>('EMAIL_PASSWORD'),
            },
          },
          defaults: {
            from: `"호텔잡" <${config.get<string>('EMAIL_USER')}>`,
          },
          ...(templateConfig && { template: templateConfig }),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [MailService, EmailVerificationMailer],
  exports: [MailService, EmailVerificationMailer],
})
export class MailModule {}

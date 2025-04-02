import { BadRequestException, HttpException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailVerification } from './entities/email-verification.entity';
import { Repository } from 'typeorm';
import { RequestVerificationDto } from './dto/request-verification.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { EmailVerificationMailer } from '../../mail/verification/verification-mailer.service';
import { VERIFICATION_CODE_EXPIRATION_MINUTES } from '../../mail/verification/verification-mail.constants';
import { CryptoService } from '../../providers/crypto/crypto.service';
import { ConfigService } from '@nestjs/config';
import { ResponseStatus } from '../../common/constants/responseStatus';
import { customHttpException } from '../../common/constants/custom-http-exception';
import { EmployersService } from '../employers/employers.service';
@Injectable()
export class EmailVerificationService {
  private readonly logger = new Logger(EmailVerificationService.name);

  constructor(
    @InjectRepository(EmailVerification)
    private readonly repo: Repository<EmailVerification>,
    private readonly mailer: EmailVerificationMailer,
    private readonly cryptoService: CryptoService,
    private readonly configService: ConfigService,
    private readonly employersService: EmployersService,
  ) {}

  async requestVerification(dto: RequestVerificationDto) {
    const { userName, email, redirect } = dto;

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiredAt = Date.now() + VERIFICATION_CODE_EXPIRATION_MINUTES * 60 * 1000;

    const token = this.cryptoService.encryptionAESWithIV(
      JSON.stringify({ userName: userName ?? null, email, redirect, code, expiredAt }),
    );

    const origin = this.configService.get('ORIGIN');

    const verificationUrl = `${origin}/email-verify?token=${encodeURIComponent(token)}`;

    try {
      await this.mailer.sendVerificationEmail(email, verificationUrl);

      await this.repo.save(this.repo.create({ email, code, expiredAt: new Date(expiredAt) }));

      return { status: ResponseStatus.SUCCESS };
    } catch (error) {
      this.logger.error(`requestVerification ${error.message}`);

      throw new BadRequestException(customHttpException.EMAIL_VERIFICATION_FAILED);
    }
  }

  async verifyAccountToken(token: string) {
    const decrypted = this.cryptoService.decryptionAESWithIV(token);

    const { email, code, expiresAt, redirect } = JSON.parse(decrypted);
    console.log('JSON.parse(decrypted): ', JSON.parse(decrypted));

    if (Date.now() > expiresAt) {
      throw new BadRequestException(customHttpException.EMAIL_VERIFICATION_EXPIRED);
    }

    try {
      const record = await this.repo.findOne({
        where: { email, code, verified: false },
        order: { createdAt: 'DESC' },
      });

      if (!record) {
        throw new BadRequestException(customHttpException.EMAIL_INVALID_OR_ALREADY_VERIFIED);
      }

      record.verified = true;

      await this.repo.save(record);

      return { status: ResponseStatus.SUCCESS, redirect, token };
    } catch (error) {
      this.logger.error(`verifyAccountToken ${error.message}`);
      if (error instanceof HttpException) {
        throw error;
      }

      throw new BadRequestException(customHttpException.EMAIL_VERIFICATION_FAILED);
    }
  }

  async verifyAccountSuccess(token: string) {
    const decrypted = this.cryptoService.decryptionAESWithIV(token);

    const { email, code, userName } = JSON.parse(decrypted);

    try {
      const record = await this.repo.findOne({
        where: { email, code, verified: true, used: false },
        order: { createdAt: 'DESC' },
      });

      if (!record) {
        throw new BadRequestException(customHttpException.EMAIL_INVALID_OR_ALREADY_VERIFIED);
      }

      const employer = await this.employersService.findByUserNameAndEmail(userName, email);

      record.used = true;
      record.userName = userName;
      record.userId = employer.userId;

      await this.repo.save(record);

      return { status: ResponseStatus.SUCCESS, userId: employer.userId };
    } catch (error) {
      this.logger.error(`verifyAccountSuccess ${error.message}`);
      if (error instanceof HttpException) {
        throw error;
      }

      throw new BadRequestException(customHttpException.EMAIL_VERIFICATION_FAILED);
    }
  }
}

import { BadRequestException, Body, Controller, Post, UseGuards, Req, NotFoundException, Logger } from '@nestjs/common';
import { CertificationService } from './certification.service';
import { customHttpException } from '../../common/constants/custom-http-exception';
import { ApiOperation } from '@nestjs/swagger';
import { VerifyDto } from './dto/verify..dto';
import { PassportJwtGuard } from '../auth/guards/passport-jwt.guard';
import { Roles } from '../../common/decorators/metadata/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Request } from 'express';
import { RequestUser } from '../auth/interfaces/jwt-payload.interface';
import { AuthService } from '../auth/auth.service';
import { CouponService } from '../../modules/coupon/coupon.service';
import { Employer } from '../../modules/employers/entities/employer.entity';
@Controller('certification')
export class CertificationController {
  private readonly logger = new Logger(CouponService.name);

  constructor(
    private readonly certificationService: CertificationService,
    private readonly authService: AuthService,
    private readonly couponService: CouponService,
  ) {}

  @ApiOperation({ summary: '본인인증 요청' })
  @Post('start')
  async certificationStart() {
    const response = await this.certificationService.startCertification();

    return response;
  }

  @ApiOperation({ summary: '본인인증 복호화' })
  @UseGuards(PassportJwtGuard, RolesGuard)
  @Post('verify')
  @Roles('JOB_SEEKER', 'EMPLOYER')
  async verifyEmployer(@Req() req: Request, @Body() verify: any) {
    const user = req.user as RequestUser;

    const existingUser = await this.authService.getUserByProvider(user.provider, user.sub);

    if (!existingUser) {
      throw new NotFoundException(customHttpException.NOT_FOUND_USER);
    }

    const verifyDnHash = await this.certificationService.verifyDnHash(verify);

    const decryptCert = await this.certificationService.decryptCert(verifyDnHash);

    const saveCertification = await this.certificationService.saveCertification(decryptCert, existingUser, user.role);

    if (existingUser instanceof Employer) {
      try {
        await this.couponService.assignWelcomeCoupon(existingUser);
      } catch (error) {
        console.error(`[쿠폰 발급 실패] 사용자 ID: ${existingUser.id}`, error.message);
      }
    }

    return saveCertification;
  }

  // @ApiOperation({ summary: '아이디 찾기 인증' })
  // @Post('verify/employer/recover/account')
  // async verifyEmployerRecoverAccount(@Body() verify: VerifyDto) {
  //   if (!verify) {
  //     throw new BadRequestException(customHttpException.CERTIFICATION_BAD_REQUEST);
  //   }

  //   const verifyDnHash = await this.certificationService.verifyDnHash(verify);

  //   const decryptCert = await this.certificationService.decryptCert(verifyDnHash);

  //   return decryptCert;
  // }

  // @ApiOperation({ summary: '비밀번호 찾기 인증' })
  // @Post('verify/employer/recover/password')
  // async verifyEmployerRecoverPassword(@Body() verify: VerifyDto) {
  //   if (!verify) {
  //     throw new BadRequestException(customHttpException.CERTIFICATION_BAD_REQUEST);
  //   }

  //   const verifyDnHash = await this.certificationService.verifyDnHash(verify);

  //   const decryptCert = await this.certificationService.decryptCert(verifyDnHash);

  //   return decryptCert;
  // }
}

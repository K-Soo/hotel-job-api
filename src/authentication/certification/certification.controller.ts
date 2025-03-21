import { BadRequestException, Body, Controller, Post, UseGuards, Req, NotFoundException, Logger } from '@nestjs/common';
import { CertificationService } from './certification.service';
import { customHttpException } from '../../common/constants/custom-http-exception';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PassportJwtGuard } from '../auth/guards/passport-jwt.guard';
import { Roles } from '../../common/decorators/metadata/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Request } from 'express';
import { RequestUser } from '../auth/interfaces/jwt-payload.interface';
import { AuthService } from '../auth/auth.service';
import { CouponService } from '../../modules/coupon/coupon.service';
import { Employer } from '../../modules/employers/entities/employer.entity';
import { NotificationService } from '../../modules/notifications/notifications.service';
import { ResponseStatus } from '../../common/constants/responseStatus';
import { CategoryType, NotificationType } from '../../common/constants/notification';
import { EmployersService } from '../../modules/employers/employers.service';

@Controller('certification')
export class CertificationController {
  constructor(
    private readonly certificationService: CertificationService,
    private readonly authService: AuthService,
    private readonly couponService: CouponService,
    private readonly notificationService: NotificationService,
    private readonly employersService: EmployersService,
  ) {}

  @ApiOperation({ summary: '본인인증 요청' })
  @Post('start')
  async certificationStart() {
    const response = await this.certificationService.startCertification();

    return response;
  }

  @ApiOperation({ summary: '본인인증 복호화' })
  @UseGuards(PassportJwtGuard, RolesGuard)
  @Post('account/verify')
  @Roles('JOB_SEEKER', 'EMPLOYER')
  async verifyEmployer(@Req() req: Request, @Body() verify: any) {
    const user = req.user as RequestUser;

    const existingUser = await this.authService.getUserByProvider(user.provider, user.sub);

    if (!existingUser) {
      throw new NotFoundException(customHttpException.NOT_FOUND_USER);
    }

    const verifyDnHash = await this.certificationService.verifyDnHash(verify);

    const decryptCert = await this.certificationService.decryptCert(verifyDnHash);

    const saveCertification = await this.certificationService.saveCertification(decryptCert, existingUser);

    if (existingUser instanceof Employer) {
      try {
        const result = await this.couponService.assignWelcomeCoupon(existingUser);

        if (result.status !== ResponseStatus.SUCCESS) {
          throw new BadRequestException(customHttpException.COUPON_ISSUE_FAILED);
        }

        await this.notificationService.sendNotification({
          category: CategoryType.WELCOME,
          title: `회원가입을 축하합니다. 🎉`,
          link: `/employer/coupon`,
          userIds: [existingUser.id],
          message: `무료 쿠폰이 발급됬습니다. 쿠폰함을 확인해주세요.`,
          notificationType: [NotificationType.IN_APP, NotificationType.PUSH],
        });
      } catch (error) {
        console.error(`[쿠폰 발급 실패] 사용자 ID: ${existingUser.id}`, error.message);
      }
    }

    return saveCertification;
  }

  @ApiOperation({ summary: '인증정보가 해당 유저의 본인 인증정보가 맞는지 확인' })
  @ApiBearerAuth()
  @UseGuards(PassportJwtGuard, RolesGuard)
  @Roles('EMPLOYER', 'JOB_SEEKER')
  @Post('verify/identity')
  async VerifyIdentity(@Req() req: Request, @Body() verifyDto: any) {
    const user = req.user as RequestUser;

    const employer = await this.employersService.findOneUuid(user.sub);

    if (!employer) {
      throw new NotFoundException(customHttpException.NOT_FOUND_USER);
    }

    const verifyData = await this.certificationService.verifyDnHash(verifyDto);

    const decryptData = await this.certificationService.decryptCert(verifyData);

    const certification = await this.certificationService.findVerifySignUpUser(decryptData.di, employer);

    if (certification) {
      return { status: ResponseStatus.AVAILABLE };
    }

    return { status: ResponseStatus.FAILURE };
  }
}

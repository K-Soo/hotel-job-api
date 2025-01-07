import { BadRequestException, Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { CertificationService } from './certification.service';
import { customHttpException } from '../../common/constants/custom-http-exception';
import { ApiOperation } from '@nestjs/swagger';
import { VerifyDto } from './dto/verify..dto';
import { PassportJwtGuard } from '../auth/guards/passport-jwt.guard';
import { Roles } from '../../common/decorators/metadata/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Response, Request } from 'express';
import { RequestUser } from '../auth/interfaces/jwt-payload.interface';
import { AuthService } from '../auth/auth.service';

@Controller('certification')
export class CertificationController {
  constructor(
    private readonly certificationService: CertificationService,
    private readonly authService: AuthService,
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
  async verifyEmployer(@Req() req: Request, @Body() verify: VerifyDto) {
    const user = req.user as RequestUser;

    const existingUser = await this.authService.getUserByProvider(user.provider, user.sub);

    const verifyDnHash = await this.certificationService.verifyDnHash(verify);

    const decryptCert = await this.certificationService.decryptCert(verifyDnHash);

    this.certificationService.saveCertification(decryptCert, existingUser, user.role);

    return decryptCert;
  }

  @ApiOperation({ summary: '아이디 찾기 인증' })
  @Post('verify/employer/recover/account')
  async verifyEmployerRecoverAccount(@Body() verify: VerifyDto) {
    if (!verify) {
      throw new BadRequestException(customHttpException.CERTIFICATION_BAD_REQUEST);
    }

    const verifyDnHash = await this.certificationService.verifyDnHash(verify);

    const decryptCert = await this.certificationService.decryptCert(verifyDnHash);

    return decryptCert;
  }

  @ApiOperation({ summary: '비밀번호 찾기 인증' })
  @Post('verify/employer/recover/password')
  async verifyEmployerRecoverPassword(@Body() verify: VerifyDto) {
    if (!verify) {
      throw new BadRequestException(customHttpException.CERTIFICATION_BAD_REQUEST);
    }

    const verifyDnHash = await this.certificationService.verifyDnHash(verify);

    const decryptCert = await this.certificationService.decryptCert(verifyDnHash);

    return decryptCert;
  }
}

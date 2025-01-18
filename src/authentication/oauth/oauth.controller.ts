import { Controller, Post, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { Request, Response } from 'express';
import { RequestUser } from './interfaces/user.interface';
import { ConfigService } from '@nestjs/config';
import { parseTimeToMs } from '../../common/utils/parseTimeToMs';
import { Applicant } from '../../modules/applicants/entities/applicant.entity';
@Controller('oauth')
export class OauthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('kakao')
  @UseGuards(AuthGuard('kakao-custom'))
  async kakaoSignIn(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = req.user as Applicant;
    // console.log('@@@@@@@', user.constructor.name === 'Applicant');

    const accessToken = await this.authService.generateAccessToken(user.id, user.provider, user.role);
    const refreshToken = await this.authService.generateRefreshToken(user.id, user.provider);

    const jwtRefreshExpiration = this.configService.get('JWT_REFRESH_EXPIRATION');

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: this.configService.get('APP_ENV') !== 'local',
      sameSite: this.configService.get('APP_ENV') === 'local' ? 'lax' : 'none',
      maxAge: parseTimeToMs(jwtRefreshExpiration),
      domain: this.configService.get('APP_ENV') !== 'local' ? '.hotel-job-connect.com' : undefined,
    });

    return {
      provider: user.provider,
      role: user.role,
      accessToken: accessToken,
      certificationStatus: user.certificationStatus,
      accountStatus: user.accountStatus,
      nickname: user.nickname,
    };
  }

  @Post('google')
  @UseGuards(AuthGuard('google-custom'))
  async googleSignIn(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = req.user as Applicant;
    console.log('@@@@@@@', user.constructor.name === 'Applicant');
    const accessToken = await this.authService.generateAccessToken(user.id, user.provider, user.role);
    const refreshToken = await this.authService.generateRefreshToken(user.id, user.provider);
    const jwtRefreshExpiration = this.configService.get('JWT_REFRESH_EXPIRATION');
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: this.configService.get('APP_ENV') !== 'local',
      sameSite: this.configService.get('APP_ENV') === 'local' ? 'lax' : 'none',
      maxAge: parseTimeToMs(jwtRefreshExpiration),
      domain: this.configService.get('APP_ENV') !== 'local' ? '.hotel-job-connect.com' : undefined,
    });
    return {
      provider: user.provider,
      role: user.role,
      accessToken: accessToken,
      certificationStatus: user.certificationStatus,
      accountStatus: user.accountStatus,
      nickname: user.nickname,
    };
  }
}

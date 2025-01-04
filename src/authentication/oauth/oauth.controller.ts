import { Controller, Post, UseGuards, Req, Res, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { Request, Response } from 'express';
import { RequestUser } from './interfaces/user.interface';
import { ConfigService } from '@nestjs/config';
import { parseTimeToMs } from '../../common/utils/parseTimeToMs';

@Controller('oauth')
export class OauthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('kakao')
  @UseGuards(AuthGuard('kakao-custom'))
  async kakaoSignIn(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = req.user as RequestUser;

    const accessToken = await this.authService.generateAccessToken(user.id, user.provider, user.role);
    const refreshToken = await this.authService.generateRefreshToken(user.id, user.provider);

    const jwtRefreshExpiration = this.configService.get('JWT_REFRESH_EXPIRATION');

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: this.configService.get('APP_ENV') !== 'local',
      sameSite: this.configService.get('APP_ENV') === 'local' ? 'lax' : 'none',
      maxAge: parseTimeToMs(jwtRefreshExpiration),
      domain: '.hotel-job-connect.com',
    });

    return {
      provider: user.provider,
      role: user.role,
      accessToken: accessToken,
    };
  }
}

import { Controller, Post, UseGuards, Req, Res, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { Request, Response } from 'express';
import { RequestUser } from './interfaces/user.interface';
import { ConfigService } from '@nestjs/config';
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

    res.cookie('refresh_token', refreshToken, {
      httpOnly: false,
      secure: this.configService.get('APP_ENV') !== 'local',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 15, // 15분
    });

    return {
      provider: user.provider,
      role: user.role,
      accessToken: accessToken,
    };
  }
}

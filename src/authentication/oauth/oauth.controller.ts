import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';

@Controller('oauth')
export class OauthController {
  constructor(
    private readonly oauthService: OauthService,
    private readonly authService: AuthService,
  ) {}

  @Post('kakao')
  @UseGuards(AuthGuard('kakao-custom'))
  async kakaoSignIn(@Req() req: any) {
    return req.user;
  }
}

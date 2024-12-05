import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('oauth')
export class OauthController {
  constructor(private readonly oauthService: OauthService) {}

  @Post('kakao')
  @UseGuards(AuthGuard('kakao-custom'))
  async kakaoSignIn(@Body('code') code: string) {
    console.log('code: ', code);
    // if (!code) {
    //   throw new HttpException('Authorization code is required', HttpStatus.BAD_REQUEST);
    // }
    return '';
  }
}

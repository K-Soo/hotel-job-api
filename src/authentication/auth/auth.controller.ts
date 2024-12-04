import { Controller, Post, Body, Res, Req, UseInterceptors, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { Throttle } from '@nestjs/throttler';
import { SerializeInterceptor } from '../../common/interceptors/serialize.interceptor';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import { ApiOperation } from '@nestjs/swagger';
import { PassportLocalGuard } from './guards/passport-local.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({ summary: '사업자 로그인' })
  @UseGuards(PassportLocalGuard)
  @Post('sign-in')
  // @Throttle(5, 60)
  @UseInterceptors(new SerializeInterceptor(SignInResponseDto))
  async signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) res: Response, @Req() req: Request) {
    console.log('req: ', req.user);
    // const { id, provider, userId } = req.user;

    // const accessToken = await this.authService.generateAccessToken(id);
    // const refreshToken = await this.authService.generateRefreshToken(id);

    // res.cookie('refresh_token', refreshToken, {
    //   httpOnly: true,
    //   secure: this.configService.get('APP_ENV') !== 'local',
    //   sameSite: 'lax',
    //   maxAge: 1000 * 60 * 15, // 15분
    // });

    // return { userId, provider, accessToken };
    return '';
  }

  @ApiOperation({ summary: '일반 & 사업자 공통 로그아웃' })
  @Post('sign-out')
  signOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refresh_token');

    return {
      status: 'SUCCESS',
    };
  }
}

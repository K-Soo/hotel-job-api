import { Controller, Post, Body, Res, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Throttle } from '@nestjs/throttler';
import { SerializeInterceptor } from '../../common/interceptors/serialize.interceptor';
import { SignInResponseDto } from './dto/sign-in-response.dto';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('sign-in')
  // @Throttle(5, 60)
  @UseInterceptors(new SerializeInterceptor(SignInResponseDto))
  async signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) res: Response) {
    const employerUser = await this.authService.signIn(signInDto);
    const { id, provider, userId } = employerUser;

    const accessToken = await this.authService.generateAccessToken(id);
    const refreshToken = await this.authService.generateRefreshToken(id);

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: this.configService.get('APP_ENV') !== 'local',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 15, // 15분
    });

    return { userId, provider, accessToken };
  }

  @Post('sign-out')
  signOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refresh_token');

    return {
      status: 'SUCCESS',
    };
  }
}

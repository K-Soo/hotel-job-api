import { Controller, Post, Body, Res, Req, UseInterceptors, UseGuards, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { Throttle } from '@nestjs/throttler';
import { SerializeInterceptor } from '../../common/interceptors/serialize.interceptor';
import { SignInResponseDto } from './dto/sign-in.response.dto';
import { ApiOperation } from '@nestjs/swagger';
import { PassportLocalGuard } from './guards/passport-local.guard';
import { PassportJwtGuard } from './guards/passport-jwt.guard';
import { EmployerUser } from '../../common/interfaces/user.interface';
import { customHttpException } from '../../common/constants/custom-http-exception';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { EmployersService } from '../../modules/employers/employers.service';
import { ApplicantsService } from '../../modules/applicants/applicants.service';
import { parseTimeToMs } from '../../common/utils/parseTimeToMs';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly employersService: EmployersService,
    private readonly applicantsService: ApplicantsService,
  ) {}

  @ApiOperation({ summary: '사업자 로그인' })
  @UseGuards(PassportLocalGuard)
  @Post('sign-in')
  // @Throttle(5, 60)
  @UseInterceptors(new SerializeInterceptor(SignInResponseDto))
  async signIn(@Body() _: SignInDto, @Res({ passthrough: true }) res: Response, @Req() req: Request) {
    const { id, provider, role } = req.user as EmployerUser;

    const accessToken = await this.authService.generateAccessToken(id, provider, role);
    const refreshToken = await this.authService.generateRefreshToken(id, provider);

    const jwtRefreshExpiration = this.configService.get('JWT_REFRESH_EXPIRATION');

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: this.configService.get('APP_ENV') !== 'local',
      sameSite: 'lax',
      maxAge: parseTimeToMs(jwtRefreshExpiration),
    });

    return { ...req.user, accessToken };
  }

  @ApiOperation({ summary: '일반 & 사업자 공통 로그아웃' })
  @Post('sign-out')
  signOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refresh_token');

    return {
      status: 'SUCCESS',
    };
  }

  @ApiOperation({ summary: '인증한 사용자 정보' })
  @UseGuards(PassportJwtGuard)
  @Post('me')
  userMe(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return 'me';
  }

  @ApiOperation({ summary: 'refresh token 재 요청' })
  @Post('refresh')
  @UseInterceptors(new SerializeInterceptor(SignInResponseDto))
  async updateToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) {
      throw new ForbiddenException(customHttpException.REFRESH_TOKEN_MISSING);
    }
    const user = await this.authService.refreshAccessToken(refreshToken);

    const { id, provider, role } = user;

    const newAccessToken = await this.authService.generateAccessToken(id, provider, role);
    const newRefreshToken = await this.authService.generateRefreshToken(id, provider);

    const jwtRefreshExpiration = this.configService.get('JWT_REFRESH_EXPIRATION');

    res.cookie('refresh_token', newRefreshToken, {
      httpOnly: true,
      secure: this.configService.get('APP_ENV') !== 'local',
      sameSite: 'lax',
      maxAge: parseTimeToMs(jwtRefreshExpiration),
    });

    return { ...user, accessToken: newAccessToken };
  }
}

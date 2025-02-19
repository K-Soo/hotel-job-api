import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  UseInterceptors,
  UseGuards,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
  ConflictException,
  Get,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { Throttle } from '@nestjs/throttler';
import { SerializeInterceptor } from '../../common/interceptors/serialize.interceptor';
import { SignInResponseDto } from './dto/sign-in.response.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PassportLocalGuard } from './guards/passport-local.guard';
import { PassportJwtGuard } from './guards/passport-jwt.guard';
import { EmployerUser } from '../../common/interfaces/user.interface';
import { customHttpException } from '../../common/constants/custom-http-exception';
import { EmployersService } from '../../modules/employers/employers.service';
import { ApplicantsService } from '../../modules/applicants/applicants.service';
import { parseTimeToMs } from '../../common/utils/parseTimeToMs';
import { RequestUser } from './interfaces/jwt-payload.interface';
import { MeResponseDto } from './dto/me.response.dto';
import { ConsentsService } from '../../modules/consents/consents.service';
import { DataSource } from 'typeorm';
import { CreateSignupDto } from './interfaces/create-sign-up.dto';
import { ResponseSignUpDto } from './interfaces/response-sign-up.dto';
import { Employer } from '../../modules/employers/entities/employer.entity';
import { ResponseStatus } from '../../common/constants/responseStatus';
import { NicknameCheckDto } from './interfaces/nickname-check.dto';
import { Applicant } from '../../modules/applicants/entities/applicant.entity';
import { BLACKLISTED_NAMES } from '../../common/constants/blacklist';
import { Roles } from '../../common/decorators/metadata/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly employersService: EmployersService,
    private readonly applicantsService: ApplicantsService,
    private readonly consentsService: ConsentsService,
    private readonly dataSource: DataSource,
  ) {}

  @ApiOperation({ summary: '사업자 로그인' })
  @UseGuards(PassportLocalGuard)
  @Post('sign-in')
  // @Throttle(5, 60)
  @UseInterceptors(new SerializeInterceptor(SignInResponseDto))
  async signIn(@Body() _: SignInDto, @Res({ passthrough: true }) res: Response, @Req() req: Request) {
    const { id, provider, role } = req.user as Employer;

    const accessToken = await this.authService.generateAccessToken(id, provider, role);
    const refreshToken = await this.authService.generateRefreshToken(id, provider);

    const jwtRefreshExpiration = this.configService.get('JWT_REFRESH_EXPIRATION');

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: this.configService.get('APP_ENV') !== 'local',
      sameSite: this.configService.get('APP_ENV') === 'local' ? 'lax' : 'none',
      maxAge: parseTimeToMs(jwtRefreshExpiration),
      domain: this.configService.get('APP_ENV') !== 'local' ? '.hotel-job-connect.com' : undefined,
    });

    return { ...req.user, accessToken };
  }

  @ApiOperation({ summary: '사업자 사용자 회원가입' })
  @UseInterceptors(new SerializeInterceptor(ResponseSignUpDto))
  @Post('sign-up')
  async signUpEmployer(@Body() createSignupDto: CreateSignupDto, @Res({ passthrough: true }) res: Response) {
    const employerUser = await this.dataSource.transaction(async (manager) => {
      try {
        const employer = await this.employersService.create(createSignupDto, manager);

        await this.consentsService.createEmployerConsent(createSignupDto, employer, manager);

        return employer;
      } catch (error) {
        if (error instanceof ConflictException) {
          throw error;
        }
        throw new BadRequestException();
      }
    });

    const accessToken = await this.authService.generateAccessToken(
      employerUser.id,
      employerUser.provider,
      employerUser.role,
    );

    const refreshToken = await this.authService.generateRefreshToken(employerUser.id, employerUser.provider);

    const jwtRefreshExpiration = this.configService.get('JWT_REFRESH_EXPIRATION');

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: this.configService.get('APP_ENV') !== 'local',
      sameSite: this.configService.get('APP_ENV') === 'local' ? 'lax' : 'none',
      maxAge: parseTimeToMs(jwtRefreshExpiration),
      domain: this.configService.get('APP_ENV') !== 'local' ? '.hotel-job-connect.com' : undefined,
    });

    return {
      ...employerUser,
      accessToken,
    };
  }

  @ApiOperation({ summary: '일반 & 사업자 공통 로그아웃' })
  @Post('sign-out')
  signOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refresh_token', {
      domain: this.configService.get('APP_ENV') !== 'local' ? '.hotel-job-connect.com' : undefined,
    });

    return {
      status: ResponseStatus.SUCCESS,
    };
  }

  @ApiOperation({ summary: '사용자 인증 정보' })
  @UseGuards(PassportJwtGuard)
  @Post('me')
  @UseInterceptors(new SerializeInterceptor(MeResponseDto))
  async userMe(@Req() req: Request) {
    const user = req.user as RequestUser;
    try {
      const existingUser = await this.authService.getUserByProvider(user.provider, user.sub);
      return existingUser;
    } catch (error) {
      console.log('error: ', error.name);
      throw new NotFoundException(customHttpException.NOT_FOUND_USER);
    }
  }

  @ApiOperation({ summary: 'token 갱신' })
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
      sameSite: this.configService.get('APP_ENV') === 'local' ? 'lax' : 'none',
      maxAge: parseTimeToMs(jwtRefreshExpiration),
      domain: this.configService.get('APP_ENV') !== 'local' ? '.hotel-job-connect.com' : undefined,
    });

    return { accessToken: newAccessToken };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '닉네임 변경' })
  @UseGuards(PassportJwtGuard, RolesGuard)
  @Roles('EMPLOYER', 'JOB_SEEKER')
  @Patch('nickname')
  async changeNickname(@Req() req: Request, @Body() nicknameCheckDto: NicknameCheckDto) {
    const user = req.user as RequestUser;
    const { newNickname } = nicknameCheckDto;

    if (BLACKLISTED_NAMES.includes(newNickname.toLowerCase())) {
      return { status: ResponseStatus.FAILURE };
    }

    const isDuplicate = await this.authService.isNicknameTaken(newNickname);

    if (isDuplicate) {
      return { status: ResponseStatus.DUPLICATE };
    }

    if (user.role === 'JOB_SEEKER') {
      await this.applicantsService.updateNickname(user.sub, newNickname);
    }

    if (user.role === 'EMPLOYER') {
      await this.employersService.updateNickname(user.sub, newNickname);
    }

    return { status: ResponseStatus.SUCCESS };
  }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { customHttpException } from '../../../common/constants/custom-http-exception';
import { ApplicantsService } from '../../../modules/applicants/applicants.service';
import { Applicant } from '../../../modules/applicants/entities/applicant.entity';
import { GoogleGetAccessTokenPayload, GoogleUserInfoPayload } from '../interfaces/google.interface';
import { oauth } from '../../../common/constants/api';
import { JwtService } from '@nestjs/jwt';
import { CreateOAuthDto } from '../dto/create-oauth.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ConsentsService } from '../../../modules/consents/consents.service';
import { Provider } from '../../../common/constants/app.enum';

@Injectable()
export class GoogleCustomStrategy extends PassportStrategy(Strategy, 'google-custom') {
  constructor(
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly applicantsService: ApplicantsService,
    private readonly consentsService: ConsentsService,
  ) {
    super();
  }

  async validate(req: { body: CreateOAuthDto }) {
    const googleOAuthData = plainToInstance(CreateOAuthDto, req.body);

    const errors = await validate(CreateOAuthDto);

    // 회원가입 폼과 함께 가입 요청
    if (googleOAuthData.requestType === 'signUp') {
      // 동의 체크 여부 벨리데이션
      if (errors.length > 0) {
        throw new BadRequestException(customHttpException.OAUTH_SIGN_IN_BAD_REQUEST);
      }
    }

    // 구글 액세스 토큰 가져오기
    const accessTokenResponse = await this.getAccessToken(googleOAuthData.code);
    console.log('accessTokenResponse: ', accessTokenResponse);

    // 사용자 정보 가져오기
    const googleUser = await this.getGoogleUserInfo(accessTokenResponse.access_token);
    console.log('googleUser: ', googleUser);
    const GoogleUserId = googleUser.id;
    const googleUserEmail = googleUser.email;

    const existingUser = await this.applicantsService.findByUserId(GoogleUserId);

    // 가입된 유저가 없음
    if (!existingUser) {
      if (googleOAuthData.requestType === 'signIn') {
        throw new NotFoundException(customHttpException.OAUTH_SIGN_IN_NOT_FOUND_USER);
      }

      // Application 생성
      const createdApplication = await this.applicantsService.create(GoogleUserId, googleUserEmail, Provider.GOOGLE);

      // Consent 생성
      await this.consentsService.createApplicantConsent(googleOAuthData, createdApplication);

      return createdApplication;
    }

    return existingUser;
  }

  // Google 인가 코드로부터 액세스 토큰을 가져옴
  private async getAccessToken(code: string): Promise<GoogleGetAccessTokenPayload> {
    try {
      const response = this.httpService.post('https://oauth2.googleapis.com/token', null, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        params: {
          grant_type: 'authorization_code',
          client_id: this.configService.get<string>('GOOGLE_CLIENT_ID'),
          client_secret: this.configService.get<string>('GOOGLE_CLIENT_SECRET'),
          redirect_uri: this.configService.get<string>('GOOGLE_REDIRECT_URI'),
          code,
        },
        timeout: 3000,
      });
      const { data } = await lastValueFrom(response);
      return data;
    } catch (error) {
      console.error('Error fetching Google access token:', error.response?.data || error.message);
      throw new BadRequestException(customHttpException.OAUTH_GET_TOKEN_ERROR);
    }
  }

  // Google 액세스 토큰으로 사용자 정보 가져오기
  private async getGoogleUserInfo(accessToken: string): Promise<GoogleUserInfoPayload> {
    try {
      const response = this.httpService.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
        timeout: 3000,
      });
      const { data } = await lastValueFrom(response);
      return data;
    } catch (error) {
      console.error('Error fetching Google user info:', error.response?.data || error.message);
      throw new BadRequestException(customHttpException.OAUTH_GET_USER_INFO_ERROR);
    }
  }
}

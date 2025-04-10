import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { customHttpException } from '../../../common/constants/custom-http-exception';
import { ApplicantsService } from '../../../modules/applicants/applicants.service';
import { Applicant } from '../../../modules/applicants/entities/applicant.entity';
import { KakaoPayload } from '../interfaces/user.interface';
import { oauth } from '../../../common/constants/api';
import { JwtService } from '@nestjs/jwt';
import { CreateOAuthDto } from '../dto/create-oauth.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ConsentsService } from '../../../modules/consents/consents.service';
import { Provider } from '../../../common/constants/app.enum';

@Injectable()
export class KakaoCustomStrategy extends PassportStrategy(Strategy, 'kakao-custom') {
  constructor(
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly applicantsService: ApplicantsService,
    private readonly consentsService: ConsentsService,
  ) {
    super();
  }

  async validate(req: { body: CreateOAuthDto }): Promise<Applicant> {
    const kakaoOAuthData = plainToInstance(CreateOAuthDto, req.body);

    const errors = await validate(CreateOAuthDto);

    if (kakaoOAuthData.requestType === 'signUp') {
      if (errors.length > 0) {
        throw new BadRequestException(customHttpException.OAUTH_SIGN_IN_BAD_REQUEST);
      }
    }

    const accessTokenResponse = await this.getAccessToken(kakaoOAuthData.code);

    const kakaoPayload: KakaoPayload = this.jwtService.decode(accessTokenResponse.id_token);

    const kakaoUserId = kakaoPayload.sub;
    const kakaoUserEmail = kakaoPayload.email;

    const existingUser = await this.applicantsService.findByUserId(kakaoUserId);

    // 가입된 유저가 없음
    if (!existingUser) {
      if (kakaoOAuthData.requestType === 'signIn') {
        throw new NotFoundException(customHttpException.OAUTH_SIGN_IN_NOT_FOUND_USER);
      }

      // Application 생성
      const createdApplication = await this.applicantsService.create(kakaoUserId, kakaoUserEmail, Provider.KAKAO);

      // Consent 생성
      await this.consentsService.createApplicantConsent(kakaoOAuthData, createdApplication);

      return createdApplication;
    }

    return existingUser;
  }

  // 카카오 인가 코드로부터 액세스 토큰을 가져옴
  private async getAccessToken(code: string): Promise<any> {
    try {
      const response = this.httpService.post(oauth.kakao.token, null, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        params: {
          grant_type: 'authorization_code',
          client_id: this.configService.get('KAKAO_CLIENT_ID'),
          code,
        },
        timeout: 7000,
      });
      const { data } = await lastValueFrom(response);
      return data;
    } catch (error) {
      console.error('Error fetching Kakao access token:', error.response?.data || error.message);

      //동일한 인가 코드를 두 번 이상 사용하거나, 이미 만료된 인가 코드를 사용한 경우
      if (error.response?.data.error_code === 'KOE320') {
        throw new NotFoundException(customHttpException.OAUTH_SIGN_IN_NOT_FOUND_USER);
      }
      if (error.response?.data.error_code === 'KOE237') {
        throw new NotFoundException(customHttpException.OAUTH_SIGN_IN_TOKEN_RATE_LIMIT);
      }

      throw new BadRequestException(customHttpException.OAUTH_GET_TOKEN_ERROR);
    }
  }
}

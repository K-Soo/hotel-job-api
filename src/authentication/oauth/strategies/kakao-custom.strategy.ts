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
    const kakaoDto = plainToInstance(CreateOAuthDto, req.body);

    const errors = await validate(CreateOAuthDto);

    // 회원가입일 경우 에러처리
    if (kakaoDto.isInitialRequest === 'N') {
      if (errors.length > 0) {
        throw new BadRequestException(customHttpException.OAUTH_SIGN_IN_BAD_REQUEST);
      }
    }

    const accessTokenResponse = await this.getAccessToken(kakaoDto.code);

    const kakaoPayload: KakaoPayload = this.jwtService.decode(accessTokenResponse.id_token);

    const existingUser = await this.applicantsService.findOneUserId(Number(kakaoPayload.sub));

    if (!existingUser) {
      if (kakaoDto.isInitialRequest === 'Y') {
        throw new NotFoundException(customHttpException.OAUTH_SIGN_IN_NOT_FOUND_USER);
      }

      const createdUser = await this.applicantsService.create(Number(kakaoPayload.sub));
      await this.consentsService.createApplicantConsent(kakaoDto, createdUser);

      return createdUser;
    }

    return existingUser;
  }

  private async getAccessToken(code: string): Promise<any> {
    try {
      const response = this.httpService.post(oauth.kakao.token, null, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        params: {
          grant_type: 'authorization_code',
          client_id: this.configService.get('KAKAO_CLIENT_ID'),
          code,
        },
      });
      const { data } = await lastValueFrom(response);
      return data;
    } catch (error) {
      console.error('Error fetching Kakao access token:', error.response?.data || error.message);

      //동일한 인가 코드를 두 번 이상 사용하거나, 이미 만료된 인가 코드를 사용한 경우
      if (error.response?.data.error_code === 'KOE320') {
        throw new NotFoundException(customHttpException.OAUTH_SIGN_IN_NOT_FOUND_USER);
      }

      throw new BadRequestException(customHttpException.OAUTH_SIGN_IN_TOKEN);
    }
  }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { customHttpException } from '../../../common/constants/custom-http-exception';
import { ApplicantsService } from '../../../modules/applicants/applicants.service';
import { Applicant } from '../../../modules/applicants/entities/applicant.entity';
import { KakaoUser } from '../interfaces/user.interface';
import { oauth } from '../../../common/constants/api';
import { HttpException, HttpStatus } from '@nestjs/common';
@Injectable()
export class KakaoCustomStrategy extends PassportStrategy(Strategy, 'kakao-custom') {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly applicantsService: ApplicantsService,
  ) {
    super();
  }

  async validate(req: { body: { code: string; isInitialRequest: boolean } }): Promise<Applicant> {
    const { code, isInitialRequest } = req.body;

    if (!code) {
      throw new NotFoundException(customHttpException.OAUTH_SIGN_IN_BAD_REQUEST);
    }

    const tokenResponse = await this.getAccessToken(code);

    const { access_token } = tokenResponse;

    if (!access_token) {
      throw new Error('Failed to retrieve access token from Kakao');
    }

    const userInfoResponse = await this.getUserInfo(access_token);
    const user = await this.applicantsService.findOneUserId(userInfoResponse.id);

    if (!user) {
      if (isInitialRequest) {
        throw new NotFoundException(customHttpException.OAUTH_SIGN_IN_NOT_FOUND_USER);
      }
      const createUser = await this.applicantsService.create(userInfoResponse.id);
      return createUser;
    }

    return user;
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
      throw new BadRequestException(customHttpException.OAUTH_SIGN_IN_TOKEN);
    }
  }

  private async getUserInfo(accessToken: string): Promise<KakaoUser> {
    try {
      const response = this.httpService.get(oauth.kakao.userInfo, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { data } = await lastValueFrom(response);

      return data;
    } catch (error) {
      console.error('Error fetching Kakao access token:', error.response?.data || error.message);
      throw new BadRequestException(customHttpException.OAUTH_SIGN_IN_USER_INFO);
    }
  }
}

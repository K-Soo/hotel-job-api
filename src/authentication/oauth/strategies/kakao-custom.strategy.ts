import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { customHttpException } from '../../../common/constants/custom-http-exception';
import { ApplicantsService } from '../../../modules/applicants/applicants.service';
@Injectable()
export class KakaoCustomStrategy extends PassportStrategy(Strategy, 'kakao-custom') {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly applicantsService: ApplicantsService,
  ) {
    super();
  }

  async validate(req: any): Promise<any> {
    const { code } = req.body;

    if (!code) {
      throw new Error('Authorization code is required');
    }
    const tokenUrl = 'https://kauth.kakao.com/oauth/token';
    const tokenResponse = await this.getAccessToken(code, tokenUrl);

    const { access_token } = tokenResponse;

    if (!access_token) {
      throw new Error('Failed to retrieve access token from Kakao');
    }

    const userInfoUrl = 'https://kapi.kakao.com/v2/user/me';

    const userInfoResponse = await this.getUserInfo(access_token, userInfoUrl);

    return {
      ...userInfoResponse,
    };
  }

  private async getAccessToken(code: string, url: string): Promise<any> {
    try {
      const response = this.httpService.post(url, null, {
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
      throw new BadRequestException(customHttpException.OAUTH_TOKEN_ERROR);
    }
  }

  private async getUserInfo(accessToken: string, url: string): Promise<any> {
    try {
      const response = this.httpService.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { data } = await lastValueFrom(response);
      console.log('data: ', data);
      const user = this.applicantsService.findOne(data.id);
      console.log('user: ', user);
      return data;
    } catch (error) {
      console.error('Error fetching Kakao access token:', error.response?.data || error.message);
      throw new BadRequestException(customHttpException.OAUTH_USER_INFO_ERROR);
    }
  }
}

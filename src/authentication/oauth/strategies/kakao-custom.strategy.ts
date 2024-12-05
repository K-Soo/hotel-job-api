import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class KakaoCustomStrategy extends PassportStrategy(Strategy, 'kakao-custom') {
  constructor(private readonly httpService: HttpService) {
    super();
  }

  async validate(req: any): Promise<any> {
    const { code } = req.body;

    if (!code) {
      throw new Error('Authorization code is required');
    }
    const url = 'https://kauth.kakao.com/oauth/token';

    const response = this.httpService.post(url, null, {
      params: {
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_CLIENT_ID,
        client_secret: process.env.KAKAO_CLIENT_SECRET,
        redirect_uri: process.env.KAKAO_REDIRECT_URI,
        code,
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    // // Step 1: Get access token from Kakao
    // const tokenResponse = await axios.post('https://kauth.kakao.com/oauth/token', null, {
    //   params: {
    //     grant_type: 'authorization_code',
    //     client_id: process.env.KAKAO_CLIENT_ID,
    //     client_secret: process.env.KAKAO_CLIENT_SECRET,
    //     redirect_uri: process.env.KAKAO_REDIRECT_URI,
    //     code,
    //   },
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    // });

    // const { access_token } = tokenResponse.data;

    // // Step 2: Get user info from Kakao
    // const userResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
    //   headers: {
    //     Authorization: `Bearer ${access_token}`,
    //   },
    // });

    // const user = userResponse.data;

    // // Return the user object
    // return {
    //   kakaoId: user.id,
    //   email: user.kakao_account?.email,
    //   nickname: user.properties?.nickname,
    //   profileImage: user.properties?.profile_image,
    // };
  }
}

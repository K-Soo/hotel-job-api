// kakao.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-kakao';
// import { GeneralUsersService } from '../../../models/general-users/general-users.service';
// import { CreateGeneralUserDto } from 'src/models/general-users/dto/create-general-user.dto';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: '',
      // callbackURL: 'http://localhost:8080/api/auth/kakao/callback', // 카카오 개발자에 등록한 리다이렉트 URI
      // scope: ['profile_nickname'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void,
  ): Promise<any> {
    try {
      const { id, properties } = profile._json;

      // const user = {
      //   id: id,
      //   nickname: properties.nickname,
      //   provider: profile.provider,
      // } as CreateGeneralUserDto;

      // const generalUser = await this.generalUsersService.findOne(id);

      // if (!generalUser) {
      //   await this.generalUsersService.create(user);
      // }

      // done(null, user);
    } catch (error) {
      done(error);
    }
  }
}

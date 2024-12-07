import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { customHttpException } from '../../../common/constants/custom-http-exception';

//리턴값을 주지않으면 401에러 생김 주의
export interface Payload {
  sub: number;
  lat: number; //발급 시간
  exp: number; //만료 시간
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true, // false: return 401, true: next validate func
      // secretOrKey: configService.get('JWT_ACCESS_SECRET'),
      secretOrKey: '5fa1d2c3b4e6f7a8b9c0d1e2f3a4b5c6d7e8',
      passReqToCallback: true, // Request 객체에 접근할 수 있도록 설정
    });
  }

  async validate(req: Request, payload: Payload) {
    console.log('payload: ', payload);
    console.log('req: ', req);
    const refreshToken = req.cookies['refresh_token'];
    //토큰 없을 경우만 검사 - 미들웨어에서 토큰이 있다면 만료, 위변조 검사했기 때문에 여기서는 검사하지 않음
    if (!refreshToken) {
      throw new ForbiddenException(customHttpException.REFRESH_TOKEN_MISSING);
    }
    const test = this.configService.get('JWT_ACCESS_SECRET');
    console.log('test: ', test);
    return { success: true };
    // const { exp, sub: accessTokenSub } = payload;
    console.log('payload: ', payload);

    console.log('jwt passport 만료');
    try {
      // const refreshTokenPayload: Payload = this.jwtService.verify(refreshToken, {
      //   secret: this.configService.get('JWT_REFRESH_SECRET'),
      // });
      // if (refreshTokenPayload.sub !== accessTokenSub) {
      //   throw new HttpException('FORBIDDEN: token does not match.', HttpStatus.FORBIDDEN);
      // }
      // throw new HttpException('access token expired.', HttpStatus.UNAUTHORIZED);
    } catch (error) {
      console.log('error: ', error);
      // if (error.name === 'TokenExpiredError') {
      //   throw new HttpException('FORBIDDEN: Refresh token expired.', HttpStatus.FORBIDDEN);
      // }
      // throw new HttpException('FORBIDDEN: Invalid refresh token.', HttpStatus.FORBIDDEN);
    }
  }
}

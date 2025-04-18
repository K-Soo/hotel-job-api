import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { customHttpException } from '../../../common/constants/custom-http-exception';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

// 리턴값을 주지않으면 401에러 생김 주의
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: (req: Request): string => {
        const refreshToken = req.cookies?.['refresh_token'];
        //토큰 없을 경우만 검사 - refresh token 미들웨어에서 토큰이 있다면 만료 및 위변조 검사했기 때문에 여기서는 검사하지 않음
        if (!refreshToken) {
          throw new ForbiddenException(customHttpException.REFRESH_TOKEN_MISSING);
        }

        const token: string | null = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

        // 토큰이 없을 경우 커스텀 에러 발생
        if (!token) {
          throw new UnauthorizedException(customHttpException.ACCESS_TOKEN_MISSING);
        }

        return token;
      },
      ignoreExpiration: true, // false: return 401, true: next validate func - 커스텀 예외처리 하기위해 true로 설정
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
      passReqToCallback: true, // Request 객체에 접근할 수 있도록 설정
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const accessToken = req.headers.authorization.split(' ')[1];

    const refreshToken = req.cookies['refresh_token'];

    try {
      // DEBUG: 토큰 만료시간 확인
      // const { exp } = payload;
      // const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      // const secondsRemaining = exp - currentTimeInSeconds;

      const decodedRefreshToken: JwtPayload = this.jwtService.decode(refreshToken);

      if (payload.sub !== decodedRefreshToken.sub) {
        throw new UnauthorizedException(customHttpException.ACCESS_TOKEN_INVALID_CREDENTIALS);
      }

      const verifyToken: JwtPayload = this.jwtService.verify(accessToken, {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
      });

      return {
        sub: verifyToken.sub,
        provider: verifyToken.provider,
        role: verifyToken.role,
      };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException(customHttpException.ACCESS_TOKEN_EXPIRED);
      }
      if (error instanceof JsonWebTokenError) {
        throw new ForbiddenException(customHttpException.ACCESS_TOKEN_INVALID_CREDENTIALS);
      }
    }
  }
}

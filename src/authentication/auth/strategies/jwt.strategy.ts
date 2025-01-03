import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { customHttpException } from '../../../common/constants/custom-http-exception';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
// import chalk from 'chalk';

//리턴값을 주지않으면 401에러 생김 주의

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: (req: Request): string => {
        const refreshToken = req.cookies?.['refresh_token'];
        //토큰 없을 경우만 검사 - 미들웨어에서 토큰이 있다면 만료, 위변조 검사했기 때문에 여기서는 검사하지 않음
        if (!refreshToken) {
          throw new ForbiddenException(customHttpException.REFRESH_TOKEN_MISSING);
        }
        const token: string | null = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        if (!token) {
          throw new UnauthorizedException(customHttpException.ACCESS_TOKEN_MISSING);
        }
        return token;
      },
      ignoreExpiration: true, // false: return 401, true: next validate func
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
      passReqToCallback: true, // Request 객체에 접근할 수 있도록 설정
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const accessToken = req.headers.authorization.split(' ')[1];

    const refreshToken = req.cookies['refresh_token'];

    try {
      const { exp } = payload;
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      const secondsRemaining = exp - currentTimeInSeconds;

      const decodedRefreshToken: JwtPayload = this.jwtService.decode(refreshToken);

      if (payload.sub !== decodedRefreshToken.sub) {
        throw new UnauthorizedException(customHttpException.ACCESS_TOKEN_INVALID_CREDENTIALS);
      }

      const verifyToken: JwtPayload = this.jwtService.verify(accessToken, {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
      });

      return {
        sub: payload.sub,
        provider: verifyToken.provider,
        role: verifyToken.role,
      };
    } catch (error) {
      // console.error(chalk.red('access-token middleware instanceType:', error.constructor.name));

      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException(customHttpException.ACCESS_TOKEN_EXPIRED);
      }
      if (error instanceof JsonWebTokenError) {
        throw new ForbiddenException(customHttpException.ACCESS_TOKEN_INVALID_CREDENTIALS);
      }
    }
  }
}

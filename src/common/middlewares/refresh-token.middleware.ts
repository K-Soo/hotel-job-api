import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { AuthService } from '../../authentication/auth/auth.service';
import { customHttpException } from '../../common/constants/custom-http-exception';
import chalk from 'chalk';

//1. 쿠키 토큰 위변조만 검사
//2. 쿠키 토큰 만료 체크
//3. 쿠키 토큰 없으면 다음 미들웨어로 이동
@Injectable()
export class RefreshTokenMiddleware implements NestMiddleware {
  constructor(
    // private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  async use(req: Request, res: Response, next: () => void) {
    console.log('리프레시 토큰 미들웨어');

    const token = req.cookies['refresh_token'];

    if (!token) {
      return next();
    }

    try {
      await this.authService.refreshTokenVerify(token);
      return next();
    } catch (error) {
      res.clearCookie('refresh_token');
      if (error instanceof TokenExpiredError) {
        throw new ForbiddenException(customHttpException.REFRESH_TOKEN_EXPIRED);
      }
      if (error instanceof JsonWebTokenError) {
        throw new ForbiddenException(customHttpException.REFRESH_TOKEN_INVALID_CREDENTIALS);
      }
    }
  }
}

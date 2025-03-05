import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../../authentication/auth/auth.service';
import { customHttpException } from '../../common/constants/custom-http-exception';

//1. 쿠키 토큰 위변조만 검사
//2. 쿠키 토큰 만료 체크
//3. 쿠키 토큰 없으면 다음 미들웨어로 이동
@Injectable()
export class RefreshTokenMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  use(request: Request, response: Response, next: NextFunction) {
    const token = request.cookies['refresh_token'];

    if (!token) {
      return next();
    }

    try {
      this.authService.refreshTokenVerify(token);
      return next();
    } catch (error) {
      response.clearCookie('refresh_token');
      if (error instanceof TokenExpiredError) {
        throw new ForbiddenException(customHttpException.REFRESH_TOKEN_EXPIRED);
      }
      if (error instanceof JsonWebTokenError) {
        throw new ForbiddenException(customHttpException.REFRESH_TOKEN_INVALID_CREDENTIALS);
      }
    }
  }
}

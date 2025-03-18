import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../../authentication/auth/auth.service';
import { customHttpException } from '../../common/constants/custom-http-exception';

@Injectable()
export class RefreshTokenMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  use(request: Request, response: Response, next: NextFunction) {
    const token = request.cookies['refresh_token'];

    // Refresh Token이 없으면 그대로 다음 미들웨어로 이동 (로그인 상태가 아닐 수 있음)
    if (!token) {
      return next();
    }

    try {
      // Refresh Token이 존재하면 검증 (위변조 여부 확인)
      this.authService.refreshTokenVerify(token);

      // 검증 통과 시, 그대로 다음 미들웨어로 이동
      return next();
    } catch (error) {
      // 토큰이 유효하지 않으면 Refresh Token 쿠키 삭제
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

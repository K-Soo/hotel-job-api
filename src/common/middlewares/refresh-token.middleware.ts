import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request, Response } from 'express';
// import chalk from 'chalk';
import { ConfigService } from '@nestjs/config';

// 쿠키가 있을경우 토큰 위변조만 검사함
//쿠키토큰 없으면 대응못함
@Injectable()
export class RefreshTokenMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  use(req: Request, res: Response, next: () => void) {
    const token = req.cookies['refresh_token'];

    if (!token) {
      return next();
    }

    try {
      this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
      return next();
    } catch (error) {
      // console.error(chalk.red('cookie middleware instanceType:', error.constructor.name));
      if (error instanceof TokenExpiredError) {
        throw new HttpException('refresh token Expired', HttpStatus.FORBIDDEN);
      }
      throw new HttpException('Invalid refresh token', HttpStatus.FORBIDDEN);
      res.clearCookie('refresh_token');
    }
  }
}

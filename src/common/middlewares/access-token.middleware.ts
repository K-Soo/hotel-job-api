import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
// import chalk from 'chalk';

//쿠키미들웨어 -> 헤더토큰이 있을경우 위변조 및 쿠키있는지 검사
//단점 헤더토큰 쿠키토큰 없으면 대응못함
@Injectable()
export class AccessTokenMiddleware implements NestMiddleware {
  constructor() {}

  use(req: Request, res: Response, next: () => void) {
    const authorization = req.headers['authorization'];

    // Authorization 헤더가 없으면 다음 미들웨어로 이동
    if (!authorization) {
      return next();
    }

    try {
      const accessToken = authorization.split(' ')[1];

      // const verifiedToken = this.jwtService.verify(accessToken, {
      //   secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      // });
      // req['user'] = decodedAccessToken;
      return next();
    } catch (error) {
      // console.error(chalk.red('access-token middleware instanceType:', error.constructor.name));
      // // 토큰 만료 재 요청해야해서 넘김
      // if (error instanceof TokenExpiredError) {
      //   console.log('엑세스 토큰 만료 NEXT');
      //   return next();
      // }
      // // 토큰 위변조 403
      // if (error instanceof JsonWebTokenError) {
      //   res.clearCookie('refresh_token');
      //   throw new HttpException('Invalid access token', HttpStatus.FORBIDDEN);
      // }
      // throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

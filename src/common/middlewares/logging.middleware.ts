import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP-RESPONSE');
  private isLocal: boolean;

  constructor(private readonly configService: ConfigService) {
    this.isLocal = configService.get('APP_ENV') === 'local';
  }

  use(request: Request, response: Response, next: NextFunction) {
    const { ip, method, originalUrl } = request;

    const requestTime = new Date();

    response.on('finish', () => {
      const { statusCode } = response;
      const responseTime = new Date();
      const timeTaken = responseTime.getTime() - requestTime.getTime();

      const log = {
        event: 'API Request',
        method,
        url: originalUrl,
        statusCode,
        responseTime: `${timeTaken}ms`,
        ip,
        timestamp: new Date().toISOString(),
      };

      if (this.isLocal) {
        // const userAgent = request.get('user-agent') || '';
        this.logger.debug(`${method} ${statusCode} - ${originalUrl} ${responseTime}ms IP:${ip}`);
      } else {
        // 운영 환경에서는 간소화된 로그
        this.logger.log(JSON.stringify(log));
      }
    });

    next();
  }
}

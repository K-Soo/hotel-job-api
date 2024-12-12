import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(request: Request, response: Response, next: NextFunction) {
    const { ip, method, originalUrl } = request;
    const requestTime = new Date();

    response.on('finish', () => {
      const { statusCode } = response;
      if (!(statusCode !== 200 && statusCode !== 201)) {
        const responseTime = new Date();
        const timeTaken = responseTime.getTime() - requestTime.getTime();

        // const userAgent = request.get('user-agent') || '';
        this.logger.log(`${method} ${statusCode} - ${originalUrl} ${timeTaken}ms IP:${ip}`);
      }
    });

    next();
  }
}

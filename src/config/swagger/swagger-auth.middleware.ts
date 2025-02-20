import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class SwaggerAuthMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    if (req.query.logout === 'true') {
      res.setHeader('WWW-Authenticate', 'Basic realm="Swagger"');
      return res.status(401).send('Unauthorized - Please login again');
    }

    const username = this.configService.get('SWAGGER_USER');
    const password = this.configService.get('SWAGGER_PASSWORD');

    const authHeader = req.headers.authorization;

    const base64Credentials = Buffer.from(`${username}:${password}`).toString('base64');
    const expectedAuthHeader = `Basic ${base64Credentials}`;

    if (!authHeader || authHeader !== expectedAuthHeader) {
      res.setHeader('WWW-Authenticate', 'Basic realm="Swagger"');
      return res.status(401).send('Unauthorized');
    }

    next();
  }
}

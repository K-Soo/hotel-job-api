import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      name: 'Hotel Job Connect API',
      version: '0.0.1',
      description: 'API for managing hotel job services and applications',
      // docs: 'https://dev-api.hotel-job-connect.com/api/v1/docs',
    };
  }
}

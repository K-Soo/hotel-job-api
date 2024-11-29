import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '이젠 꼐속 잘되는거니';
  }
}

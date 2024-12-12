import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  findOne() {
    return `This action returns a #$ user`;
  }
}

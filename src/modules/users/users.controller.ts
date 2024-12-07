import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '유저 정보' })
  @Get()
  findOne() {
    return this.usersService.findOne();
  }
}

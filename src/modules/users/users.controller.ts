import { Controller, Get, Post } from '@nestjs/common';
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

  @ApiOperation({ summary: '유저 프로필 정보' })
  @Get()
  findOneProfile() {
    return this.usersService.findOne();
  }

  @ApiOperation({ summary: '유저 프로필 정보 수정' })
  @Get()
  updateProfile() {
    return this.usersService.findOne();
  }
}

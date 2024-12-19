import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from '../../common/decorators/metadata/roles.decorator';
import { PassportJwtGuard } from '../../authentication/auth/guards/passport-jwt.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApplicantsService } from '../applicants/applicants.service';
import { Request } from 'express';

@ApiTags('users 일반유저')
@ApiBearerAuth()
@UseGuards(PassportJwtGuard, RolesGuard)
@Roles('JOB_SEEKER')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly applicantsService: ApplicantsService,
  ) {}

  @ApiOperation({ summary: '유저 정보' })
  @Get()
  async findOne(@Req() req: Request) {
    const userUuid = req.user['sub'];
    // const user = await this.applicantsService.findOne(userUuid);

    const user = await this.usersService.findOne(userUuid);
    return user;
  }

  // @ApiOperation({ summary: '유저 정보 수정' })
  // @Get()
  // updateUser() {
  //   return this.usersService.findOne();
  // }
}

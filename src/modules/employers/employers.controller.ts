import { Controller, Get, Param, Delete, UseGuards, Req, UseInterceptors, Patch, Body } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { EmployerResponseDto } from './dto/employer.response.dto';
import { Request } from 'express';
import { ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { RolesGuard } from '../../common/guards/roles.guard';
import { PassportJwtGuard } from '../../authentication/auth/guards/passport-jwt.guard';
import { Roles } from '../../common/decorators/metadata/roles.decorator';
import { SerializeInterceptor } from '../../common/interceptors/serialize.interceptor';
import { AccountResetDto } from './dto/account-reset.dto';

@ApiBearerAuth()
@UseGuards(PassportJwtGuard, RolesGuard)
@Roles('EMPLOYER')
@Controller('employers')
export class EmployersController {
  constructor(private readonly employersService: EmployersService) {}

  @ApiOperation({ summary: '계정정보' })
  @ApiResponse({
    status: 200,
    description: '계정정보',
    type: EmployerResponseDto,
  })
  @UseInterceptors(new SerializeInterceptor(EmployerResponseDto, { groups: ['account'] }))
  @Get()
  accountInfo(@Req() req: Request) {
    return this.employersService.accountInfo(req.user['sub']);
  }

  @ApiOperation({ summary: '비밀번호 변경' })
  @Patch('account/reset')
  accountReset(@Req() req: Request, @Body() accountResetDto: AccountResetDto) {
    return this.employersService.accountReset(accountResetDto, req.user['sub']);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { EmployersService } from './employers.service';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { EmployerResponseDto } from './dto/employer.response.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { SerializeInterceptor } from '../../common/interceptors/serialize.interceptor';
import { AuthService } from '../../authentication/auth/auth.service';
import { Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { RolesGuard } from '../../common/guards/roles.guard';
import { PassportJwtGuard } from '../../authentication/auth/guards/passport-jwt.guard';
import { Roles } from '../../common/decorators/metadata/roles.decorator';

@ApiTags('사업자 유저')
@ApiBearerAuth()
@UseGuards(PassportJwtGuard, RolesGuard)
@Roles('EMPLOYER')
@Controller('employers')
export class EmployersController {
  constructor(private readonly employersService: EmployersService) {}

  @ApiOperation({ summary: '계정정보' })
  @ApiResponse({
    status: 200,
    description: '계정정보 응답값',
    type: EmployerResponseDto,
  })
  // @UseInterceptors(new SerializeInterceptor(EmployerResponseDto))
  @Get()
  accountInfo(@Req() req: Request) {
    return this.employersService.accountInfo(req.user['uuid']);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employersService.remove(+id);
  }
}

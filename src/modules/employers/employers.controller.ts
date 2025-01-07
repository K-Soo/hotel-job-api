import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Res } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { EmployerResponseDto } from './dto/employer-response.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { SerializeInterceptor } from '../../common/interceptors/serialize.interceptor';
import { AuthService } from '../../authentication/auth/auth.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('사업자 유저')
@Controller('employers')
export class EmployersController {
  constructor(
    private readonly employersService: EmployersService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({ summary: '회원가입' })
  @Post()
  @UseInterceptors(new SerializeInterceptor(EmployerResponseDto))
  async create(@Body() createEmployerDto: CreateEmployerDto, @Res({ passthrough: true }) res: Response) {}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employersService.remove(+id);
  }
}

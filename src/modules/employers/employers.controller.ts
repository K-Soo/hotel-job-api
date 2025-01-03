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
  async create(@Body() createEmployerDto: CreateEmployerDto, @Res({ passthrough: true }) res: Response) {
    // console.log('인스턴스?: ', createEmployerDto instanceof CreateEmployerDto);
    // const user = await this.employersService.create(createEmployerDto);
    // const accessToken = await this.authService.generateAccessToken(user.id, user.provider, user.role);
    // res.cookie('refresh_token', accessToken, {
    //   httpOnly: true,
    //   secure: this.configService.get('APP_ENV') !== 'local',
    //   sameSite: 'lax',
    //   maxAge: 1000 * 60 * 15, // 15분
    // });
    // return {
    //   ...user,
    //   accessToken,
    // };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employersService.remove(+id);
  }
}

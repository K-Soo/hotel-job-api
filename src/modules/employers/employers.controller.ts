import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Res } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { EmployerResponseDto } from './dto/employer-response.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { SerializeInterceptor } from '../../common/interceptors/serialize.interceptor';
import { AuthService } from '../../authentication/auth/auth.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('employers')
export class EmployersController {
  constructor(
    private readonly employersService: EmployersService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @UseInterceptors(new SerializeInterceptor(EmployerResponseDto))
  async create(@Body() createEmployerDto: CreateEmployerDto, @Res({ passthrough: true }) res: Response) {
    console.log('인스턴스?: ', createEmployerDto instanceof CreateEmployerDto);

    const user = await this.employersService.create(createEmployerDto);

    const accessToken = await this.authService.generateAccessToken(user.id);

    res.cookie('refresh_token', accessToken, {
      httpOnly: true,
      secure: this.configService.get('APP_ENV') !== 'local',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 15, // 15분
    });

    return {
      ...user,
      accessToken: accessToken,
    };
  }

  @Get()
  findAll() {
    return this.employersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployerDto: UpdateEmployerDto) {
    return this.employersService.update(+id, updateEmployerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employersService.remove(+id);
  }
}

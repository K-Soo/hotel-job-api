import { Controller, Get, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { EmployerResponseDto } from './dto/employer.response.dto';
import { Request } from 'express';
import { ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { RolesGuard } from '../../common/guards/roles.guard';
import { PassportJwtGuard } from '../../authentication/auth/guards/passport-jwt.guard';
import { Roles } from '../../common/decorators/metadata/roles.decorator';

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
  // @UseInterceptors(new SerializeInterceptor(EmployerResponseDto, { groups: ['account'] }))
  @Get()
  accountInfo(@Req() req: Request) {
    return this.employersService.accountInfo(req.user['sub']);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employersService.remove(+id);
  }
}

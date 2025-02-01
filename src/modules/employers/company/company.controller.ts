import { Body, Controller, Get, NotFoundException, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { CompanyService } from './company.service';
import { EmployersService } from '../employers.service';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Roles } from '../../../common/decorators/metadata/roles.decorator';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { PassportJwtGuard } from '../../../authentication/auth/guards/passport-jwt.guard';
import { Request } from 'express';
import { SerializeInterceptor } from '../../../common/interceptors/serialize.interceptor';
import { ResponseCompanyDto } from './dto/response-company.dto';
import { customHttpException } from '../../../common/constants/custom-http-exception';
@ApiTags('Company')
@ApiBearerAuth()
@UseGuards(PassportJwtGuard, RolesGuard)
@Roles('EMPLOYER')
@Controller('employers/company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly employersService: EmployersService,
  ) {}

  @ApiOperation({ summary: '회사정보 등록' })
  @Post()
  async create(@Req() req: Request, @Body() createCompanyDto: CreateCompanyDto) {
    const employer = await this.employersService.findOneUuid(req.user['sub']);
    if (!employer) {
      throw new NotFoundException(customHttpException.NOT_FOUND_USER);
    }
    return this.companyService.create(createCompanyDto, employer);
  }

  @ApiOperation({ summary: '회사정보 요청' })
  @UseInterceptors(new SerializeInterceptor(ResponseCompanyDto))
  @ApiResponse({
    status: 200,
    description: '회사 정보를 성공적으로 반환합니다.',
    type: ResponseCompanyDto, // 반환 타입
  })
  @ApiResponse({
    status: 404,
    description: '회사를 찾을 수 없습니다.',
  })
  @ApiResponse({
    status: 401,
    description: '인증 실패.',
  })
  @Get()
  async findOne(@Req() req: Request) {
    return await this.companyService.findOne(req.user['sub']);
  }
}

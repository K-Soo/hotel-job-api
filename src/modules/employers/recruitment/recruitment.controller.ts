import { RecruitmentService } from './recruitment.service';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { PassportJwtGuard } from '../../../authentication/auth/guards/passport-jwt.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/metadata/roles.decorator';
import { DraftRecruitmentDto } from './dto/draft-recruitment.dto';
import { RecruitmentQueryDto } from './dto/recruitment-query.dto';
import { SerializeInterceptor } from '../../../common/interceptors/serialize.interceptor';
import { RecruitmentDetailResponseDto } from './dto/recruitment-response.dto';
import { Request } from 'express';
import { EmployersService } from '../employers.service';
import { RecruitmentStatusResponseDto } from './dto/recruitment-status-response.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  UseGuards,
  Query,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';

@ApiBearerAuth()
@UseGuards(PassportJwtGuard, RolesGuard)
@Roles('EMPLOYER')
@Controller('employers/recruitment')
export class RecruitmentController {
  constructor(
    private readonly recruitmentService: RecruitmentService,
    private readonly employersService: EmployersService,
  ) {}

  @ApiOperation({ summary: '채용공고 생성' })
  @Post()
  async create(@Req() req: Request, @Body() createRecruitmentDto: CreateRecruitmentDto) {
    console.log('createRecruitmentDto: ', createRecruitmentDto);
    const userUuid = req.user['sub'];
    const employer = await this.employersService.findOneUuid(userUuid);

    return this.recruitmentService.create(createRecruitmentDto, employer);
  }

  @ApiOperation({ summary: '채용공고 수정' })
  @Patch()
  async update(@Req() req: Request, @Body() createRecruitmentDto: CreateRecruitmentDto) {
    return this.recruitmentService.update(createRecruitmentDto);
  }

  @ApiOperation({ summary: '채용공고 임시저장' })
  @Post('draft')
  async draft(@Req() req: Request, @Body() draftRecruitmentDto: DraftRecruitmentDto) {
    const userUuid = req.user['sub'];
    const employer = await this.employersService.findOneUuid(userUuid);

    const draftRecruitment = await this.recruitmentService.draft(draftRecruitmentDto, employer);

    return draftRecruitment;
  }

  @ApiOperation({ summary: '채용공고 상태별 수량 집계' })
  @ApiResponse({
    status: 200,
    description: '상태별 수량',
    type: RecruitmentStatusResponseDto,
  })
  @UseInterceptors(new SerializeInterceptor(RecruitmentStatusResponseDto))
  @Get('status')
  async recruitmentStatus(@Req() req: Request) {
    return this.recruitmentService.recruitmentStatus(req.user['sub']);
  }

  @ApiOperation({ summary: '채용공고 목록' })
  @ApiResponse({ status: 200, description: '이력서 목록 응답값' })
  @Get()
  async findAll(@Req() req: Request, @Query() recruitmentQueryDto: RecruitmentQueryDto) {
    const userUuid = req.user['sub'];

    return this.recruitmentService.findAll(recruitmentQueryDto, userUuid);
  }

  @UseInterceptors(new SerializeInterceptor(RecruitmentDetailResponseDto))
  @ApiOperation({ summary: '채용공고 상세' })
  @Get(':id')
  async findOneRecruitment(@Req() req: Request, @Param('id') id: string) {
    const userUuid = req.user['sub'];

    const recruitment = await this.recruitmentService.findOneRecruitment(id, userUuid);
    return recruitment;
  }

  @ApiOperation({ summary: '채용공고 삭제' })
  @Post('/remove')
  removeMultiple(@Req() req: Request, @Body('ids') ids: string[]) {
    const userUuid = req.user['sub'];

    if (ids.length === 0) {
      throw new BadRequestException('Invalid IDs. Provide a non-empty array of IDs.');
    }

    return this.recruitmentService.removeMultiple(ids, userUuid);
  }
}

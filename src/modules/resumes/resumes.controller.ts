import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/metadata/roles.decorator';
import { PassportJwtGuard } from '../../authentication/auth/guards/passport-jwt.guard';
import { Request } from 'express';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ApplicantsService } from '../applicants/applicants.service';
import { ResumeResponseDto } from './dto/resume-response.dto';
import { SerializeInterceptor } from '../../common/interceptors/serialize.interceptor';

@ApiTags('resumes 이력서')
@ApiBearerAuth()
@Controller('resumes')
@UseGuards(PassportJwtGuard, RolesGuard)
@Roles('JOB_SEEKER')
export class ResumesController {
  constructor(
    private readonly resumesService: ResumesService,
    private readonly applicantsService: ApplicantsService,
  ) {}

  @ApiOperation({ summary: '이력서 등록' })
  @Post()
  async create(@Req() req: Request, @Body() createResumeDto: CreateResumeDto) {
    const userUuid = req.user['uuid'];
    const applicant = await this.applicantsService.findByUuid(userUuid);
    return this.resumesService.create(createResumeDto, applicant);
  }

  @ApiOperation({ summary: '모든 이력서 조회' })
  @Get()
  @UseInterceptors(new SerializeInterceptor(ResumeResponseDto))
  findAll(@Req() req: Request) {
    const userUuid = req.user['uuid'];
    return this.resumesService.findAll(userUuid);
  }

  @ApiOperation({ summary: '단일 이력서 조회' })
  @Get(':id')
  findOne(@Param('id') uuid: string) {
    return this.resumesService.findOne(uuid);
  }

  @ApiOperation({ summary: '이력서 수정' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResumeDto: UpdateResumeDto) {
    return this.resumesService.update(+id, updateResumeDto);
  }

  @ApiOperation({ summary: '이력서 삭제' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resumesService.remove(+id);
  }
}

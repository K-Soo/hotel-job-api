import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/metadata/roles.decorator';
import { PassportJwtGuard } from '../../authentication/auth/guards/passport-jwt.guard';
import { Request } from 'express';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ApplicantsService } from '../applicants/applicants.service';
import { ResumeResponseDto } from './dto/resume-response.dto';
import { SerializeInterceptor } from '../../common/interceptors/serialize.interceptor';
import { PublishResumeDto } from './dto/publish-resume.dto';

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

  @ApiOperation({ summary: '이력서 생성' })
  @Post()
  async initialCreateResume(@Req() req: Request) {
    const userUuid = req.user['uuid'];
    const applicant = await this.applicantsService.findByUuid(userUuid);
    return this.resumesService.initialCreateResume(applicant);
  }

  @ApiOperation({ summary: '이력서 제출' })
  @Post('publish')
  async publishResume(@Req() req: Request, @Body() publishResumeDto: PublishResumeDto) {
    const userUuid = req.user['uuid'];
    const applicant = await this.applicantsService.findByUuid(userUuid);
    return this.resumesService.publishResume(publishResumeDto, applicant);
  }

  @ApiOperation({ summary: '이력서 리스트' })
  @Get()
  @UseInterceptors(new SerializeInterceptor(ResumeResponseDto))
  getResumes(@Req() req: Request) {
    const userUuid = req.user['uuid'];
    return this.resumesService.getAllResumesWithApplication(userUuid);
  }

  @ApiOperation({ summary: '채용공고 지원가능한 이력서 리스트' })
  @Get('available')
  getAvailableResumes(@Req() req: Request) {
    const userUuid = req.user['uuid'];
    return this.resumesService.getAllResumesWithApplication(userUuid);
  }

  @ApiOperation({ summary: '이력서 상세조회' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const resume = await this.resumesService.findOne(id);
    if (!resume) {
      throw new NotFoundException();
    }
    return resume;
  }

  @ApiOperation({ summary: '생성된 이력서 상세조회' })
  @Get(':id/edit')
  async getEditResume(@Param('id') id: string) {
    const resume = await this.resumesService.findOne(id);
    if (!resume) {
      throw new NotFoundException();
    }
    return resume;
  }

  @ApiOperation({ summary: '이력서 삭제' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resumesService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/metadata/roles.decorator';
import { PassportJwtGuard } from '../../authentication/auth/guards/passport-jwt.guard';
import { Request } from 'express';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ApplicantsService } from '../applicants/applicants.service';
import { ResumeResponseDto } from './dto/resume-response.dto';
import { SerializeInterceptor } from '../../common/interceptors/serialize.interceptor';

@ApiTags('resumes(이력서)')
@ApiBearerAuth()
@Controller('resumes')
@UseGuards(PassportJwtGuard, RolesGuard)
export class ResumesController {
  constructor(
    private readonly resumesService: ResumesService,
    private readonly applicantsService: ApplicantsService,
  ) {}

  @Post()
  async create(@Req() req: Request, @Body() createResumeDto: CreateResumeDto) {
    const userUuid = req.user['uuid'];
    const applicant = await this.applicantsService.findByUuid(userUuid);
    return this.resumesService.create(createResumeDto, applicant);
  }

  @Get()
  @UseInterceptors(new SerializeInterceptor(ResumeResponseDto))
  findAll(@Req() req: Request) {
    const userUuid = req.user['uuid'];
    return this.resumesService.findAll(userUuid);
  }

  @Get(':id')
  findOne(@Param('id') uuid: string) {
    return this.resumesService.findOne(uuid);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResumeDto: UpdateResumeDto) {
    return this.resumesService.update(+id, updateResumeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resumesService.remove(+id);
  }
}

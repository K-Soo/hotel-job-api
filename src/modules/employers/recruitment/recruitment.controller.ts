import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RecruitmentService } from './recruitment.service';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { UpdateRecruitmentDto } from './dto/update-recruitment.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { PassportJwtGuard } from '../../../authentication/auth/guards/passport-jwt.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/metadata/roles.decorator';

@ApiBearerAuth()
@UseGuards(PassportJwtGuard, RolesGuard)
@Roles('EMPLOYER')
@Controller('recruitment')
export class RecruitmentController {
  constructor(private readonly recruitmentService: RecruitmentService) {}

  @ApiOperation({ summary: '이력서 생성' })
  @Post()
  create(@Body() createRecruitmentDto: CreateRecruitmentDto) {
    return this.recruitmentService.create(createRecruitmentDto);
  }

  @ApiOperation({ summary: '이력서 목록' })
  @ApiResponse({ status: 200, description: '이력서 목록 응답값' })
  @Get()
  findAll() {
    return this.recruitmentService.findAll();
  }

  @ApiOperation({ summary: '이력서 상세' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recruitmentService.findOne(+id);
  }

  @ApiOperation({ summary: '이력서 수정' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecruitmentDto: UpdateRecruitmentDto) {
    return this.recruitmentService.update(+id, updateRecruitmentDto);
  }

  @ApiOperation({ summary: '이력서 삭제' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recruitmentService.remove(+id);
  }
}

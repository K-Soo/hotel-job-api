import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { RecruitService } from './recruit.service';
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
import { RecruitQueryDto } from './dto/recruit-query.dto';

@Controller('recruit')
export class RecruitController {
  constructor(private readonly recruitService: RecruitService) {}

  @ApiOperation({ summary: '채용 스페셜 공고' })
  @Get('special')
  recruitSpecial(@Query() query: RecruitQueryDto) {
    return this.recruitService.getRecruitment('special', query);
  }

  @ApiOperation({ summary: '채용 급구 공고' })
  @Get('urgent')
  recruitUrgent(@Query() query: RecruitQueryDto) {
    return this.recruitService.getRecruitment('urgent', query);
  }

  @ApiOperation({ summary: '채용 일반 공고' })
  @Get('basic')
  recruitBasic(@Query() query: RecruitQueryDto) {
    console.log('query: ', query);
    return this.recruitService.getRecruitment('basic', query);
  }

  @ApiParam({
    name: 'id',
    type: Number,
    description: '채용 공고 ID',
    example: 123,
    required: true,
  })
  @Get(':id')
  recruitDetail(@Param('id') id: string) {
    this.recruitService.getRecruitDetail(id);
  }
}

import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { RecruitService } from './recruit.service';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { RecruitQueryDto } from './dto/recruit-query.dto';

@Controller('recruit')
export class RecruitController {
  constructor(private readonly recruitService: RecruitService) {}

  @ApiOperation({ summary: '채용 프리미엄 공고' })
  @Get('premium')
  premium(@Query() query: RecruitQueryDto) {
    return this.recruitService.premium(query);
  }

  @ApiOperation({ summary: '채용 스페셜 공고' })
  @Get('special')
  special(@Query() query: RecruitQueryDto) {
    return this.recruitService.special(query);
  }

  @ApiOperation({ summary: '채용 급구 공고' })
  @Get('urgent')
  urgent(@Query() query: RecruitQueryDto) {
    return this.recruitService.urgent(query);
  }

  @ApiOperation({ summary: '채용 일반 공고' })
  @Get('basic')
  basic(@Query() query: RecruitQueryDto) {
    return this.recruitService.basic(query);
  }

  @ApiParam({
    name: 'id',
    type: Number,
    description: '채용 공고 id',
    example: 123,
    required: true,
  })
  @Get(':id')
  recruitDetail(@Param('id') id: string) {
    return this.recruitService.getRecruitDetail(id);
  }
}

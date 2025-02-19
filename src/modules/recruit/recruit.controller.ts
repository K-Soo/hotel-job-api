import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { RecruitService } from './recruit.service';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { RecruitQueryDto } from './dto/recruit-query.dto';
import { RecruitmentProductType } from '../../common/constants/product';

@Controller('recruit')
export class RecruitController {
  constructor(private readonly recruitService: RecruitService) {}

  @ApiOperation({ summary: '채용 스페셜 공고' })
  @Get('special')
  recruitSpecial(@Query() query: RecruitQueryDto) {
    return this.recruitService.getSpecialRecruit(query);
  }

  @ApiOperation({ summary: '채용 급구 공고' })
  @Get('urgent')
  recruitUrgent(@Query() query: RecruitQueryDto) {
    return this.recruitService.getUrgentRecruit(query);
  }

  @ApiOperation({ summary: '채용 일반 공고' })
  @Get('basic')
  recruitBasic(@Query() query: RecruitQueryDto) {
    return this.recruitService.getBasicRecruit(query);
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

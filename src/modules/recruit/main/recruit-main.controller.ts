import { ApiOperation } from '@nestjs/swagger';
import { RecruitService } from '../recruit.service';
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

@Controller('recruit/main')
export class RecruitMainController {
  constructor(private readonly recruitService: RecruitService) {}

  @ApiOperation({ summary: '메인 프리미엄 공고' })
  @Get('main/premium')
  recruitMainPremium(@Query() query: any) {}

  @ApiOperation({ summary: '메인 스페셜 공고' })
  @Get('main/special')
  recruitMainSpecial(@Query() query: any) {}
}

import { Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Query, UseInterceptors } from '@nestjs/common';
import { TalentsService } from './talents.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { TalentResponseDto } from './dto/talent-response.dto';
import { SerializeInterceptor } from '../../common/interceptors/serialize.interceptor';

@ApiTags('talent 인재정보')
@Controller('talents')
export class TalentsController {
  constructor(private readonly talentsService: TalentsService) {}

  @ApiOperation({ summary: '인재 리스트' })
  @Get()
  // @UseInterceptors(new SerializeInterceptor(TalentResponseDto))
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    const options: IPaginationOptions = { page, limit };

    return this.talentsService.findAll(options);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '인재정보 상세' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.talentsService.findOne(id);
  }
}

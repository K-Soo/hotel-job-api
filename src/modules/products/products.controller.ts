import { ProductsService } from './products.service';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ApiOperation, ApiBearerAuth, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/metadata/roles.decorator';
import { PassportJwtGuard } from '../../authentication/auth/guards/passport-jwt.guard';
import { SerializeInterceptor } from '../../common/interceptors/serialize.interceptor';
import { RecruitmentProductQueryDto } from './dto/recruitment-product-query.dto';
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
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: '채용 상품 목록' })
  @ApiQuery({
    name: 'type',
    type: String,
    example: 'RECRUIT',
    description: 'RECRUIT, MAIN',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: '상태별 수량',
  })
  // @UseInterceptors(new SerializeInterceptor())
  @Get('recruitment')
  async recruitmentStatus(@Req() req: Request, @Query() query: RecruitmentProductQueryDto) {
    return this.productsService.findRecruitmentProducts(query);
  }
}

import { ProductsService } from './products.service';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/metadata/roles.decorator';
import { PassportJwtGuard } from '../../authentication/auth/guards/passport-jwt.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';

@ApiBearerAuth()
@UseGuards(PassportJwtGuard, RolesGuard)
@Roles('EMPLOYER')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: '채용 상품 목록' })
  @Get('recruitment')
  async recruitmentStatus() {
    return this.productsService.findRecruitmentProducts();
  }
}

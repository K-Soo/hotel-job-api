import { ProductsService } from './products.service';
import { Controller, Get } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('recruitment')
  async recruitmentStatus() {
    return this.productsService.findRecruitmentProducts();
  }
}

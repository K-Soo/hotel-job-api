import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecruitmentProduct } from './entities/recruitment.entity';
import { RecruitmentProductOption } from './entities/recruitment-option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecruitmentProduct, RecruitmentProductOption])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}

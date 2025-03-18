import { CouponService } from './coupon.service';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { RolesGuard } from '../../common/guards/roles.guard';
import { PassportJwtGuard } from '../../authentication/auth/guards/passport-jwt.guard';
import { Request } from 'express';
import { CreateEmployerCouponDto } from './dto/create-employer-coupon.dto';
import { Controller, Get, Post, Body, UseGuards, Req, Query, BadRequestException } from '@nestjs/common';
import { Roles } from '../../common/decorators/metadata/roles.decorator';
import { CreateCouponDto } from './dto/create-coupon.dto';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '쿠폰 리스트' })
  @ApiQuery({ name: 'use', required: false, type: String, description: "사용 여부 ('Y' 또는 'N')" })
  @UseGuards(PassportJwtGuard, RolesGuard)
  @Roles('EMPLOYER')
  @Get('/employer')
  getCouponsByEmployer(@Req() req: Request, @Query('use') use?: string) {
    if (use && !['Y', 'N'].includes(use)) {
      throw new BadRequestException('query parameter validation failed');
    }

    const isUsedFilter = use === 'Y' ? true : use === 'N' ? false : false;

    return this.couponService.getCouponsByEmployer(req.user['sub'], isUsedFilter);
  }

  @ApiOperation({ summary: '관리자 - 새로운 쿠폰 생성' })
  @Post()
  async createCoupon(@Body() createCouponDto: CreateCouponDto) {
    return this.couponService.createCoupon(createCouponDto);
  }

  @ApiOperation({ summary: '관리자 - 쿠폰 발급' })
  @Post('assign')
  async assignCouponToEmployer(@Body() createEmployerCouponDto: CreateEmployerCouponDto) {
    return this.couponService.assignCouponToEmployer(createEmployerCouponDto);
  }
}

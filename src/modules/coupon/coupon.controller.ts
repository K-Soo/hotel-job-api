import { CouponService } from './coupon.service';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { RolesGuard } from '../../common/guards/roles.guard';
import { PassportJwtGuard } from '../../authentication/auth/guards/passport-jwt.guard';
import { Request } from 'express';
import { CreateEmployerCouponDto } from './dto/create-employer-coupon.dto';
import { Controller, Get, Post, Body, UseGuards, Req, Query, BadRequestException } from '@nestjs/common';

@ApiBearerAuth()
@Controller('coupon')
@UseGuards(PassportJwtGuard, RolesGuard)
@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @ApiOperation({ summary: '쿠폰 리스트' })
  @Get('/employer')
  @ApiQuery({ name: 'use', required: false, type: String, description: "사용 여부 ('Y' 또는 'N')" })
  getCouponsByEmployer(@Req() req: Request, @Query('use') use?: string) {
    if (use && !['Y', 'N'].includes(use)) {
      throw new BadRequestException('query parameter validation failed');
    }

    const isUsedFilter = use === 'Y' ? true : use === 'N' ? false : false;

    return this.couponService.getCouponsByEmployer(req.user['sub'], isUsedFilter);
  }

  @ApiOperation({ summary: '관리자 수동 쿠폰 발급' })
  @Post('assign')
  async assignCouponToEmployer(@Body() dto: CreateEmployerCouponDto) {
    return this.couponService.assignCouponToEmployer(dto);
  }
}

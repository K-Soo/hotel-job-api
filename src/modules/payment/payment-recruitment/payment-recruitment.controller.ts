import { Body, Controller, Post, UseGuards, Req, Param, Get } from '@nestjs/common';
import { PaymentRecruitmentService } from './payment-recruitment.service';
import { InitiateRecruitmentPaymentDto } from './dto/initiate-recruitment-payment.dto';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../../../common/decorators/metadata/roles.decorator';
import { PassportJwtGuard } from '../../../authentication/auth/guards/passport-jwt.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Request } from 'express';
import { ConfirmRecruitmentPaymentDto } from './dto/confirm-recruitment-payment.dto';
import { AvailableCouponResponseDto } from './dto/available-coupon-response.dto';
import { ApplyCouponDto } from './dto/apply-coupon.dto';
import { CancelCouponDto } from './dto/cancel-coupon.dto';
import { ConfirmFreeRecruitmentPaymentDto } from './dto/confirm-free-recruitment-payment.dto';

@ApiBearerAuth()
@UseGuards(PassportJwtGuard, RolesGuard)
@Roles('EMPLOYER')
@Controller('payment/recruitment')
export class PaymentRecruitmentController {
  constructor(private readonly paymentRecruitmentService: PaymentRecruitmentService) {}

  @ApiOperation({ summary: '채용상품 결제 초기화' })
  @Post('initiate')
  async initiateRecruitmentPayment(
    @Req() req: Request,
    @Body() initiateRecruitmentPaymentDto: InitiateRecruitmentPaymentDto,
  ) {
    const userId = req.user['sub'];
    return this.paymentRecruitmentService.initiateRecruitmentPayment(initiateRecruitmentPaymentDto, userId);
  }

  @ApiOperation({ summary: '채용상품 결제 승인요청' })
  @Post('confirm')
  async confirmRecruitmentPayment(
    @Req() req: Request,
    @Body() confirmRecruitmentPaymentDto: ConfirmRecruitmentPaymentDto,
  ) {
    const userId = req.user['sub'];
    return this.paymentRecruitmentService.confirmRecruitmentPayment(confirmRecruitmentPaymentDto, userId);
  }

  @ApiOperation({ summary: '채용상품 무료 승인요청' })
  @Post('confirm/free')
  async confirmFreeRecruitmentPayment(
    @Req() req: Request,
    @Body() confirmFreeRecruitmentPaymentDto: ConfirmFreeRecruitmentPaymentDto,
  ) {
    const userId = req.user['sub'];
    return this.paymentRecruitmentService.confirmFreeRecruitmentPayment(confirmFreeRecruitmentPaymentDto, userId);
  }

  @ApiOperation({ summary: '채용상품 사용가능한 쿠폰 목록' })
  @Post('coupon')
  async AvailableCoupon(@Req() req: Request, @Body() availableCouponResponseDto: AvailableCouponResponseDto) {
    const userId = req.user['sub'];
    return this.paymentRecruitmentService.AvailableCoupon(availableCouponResponseDto.orderId, userId);
  }

  @ApiOperation({ summary: '결제상품 쿠폰 적용' })
  @Post('coupon/apply')
  async applyCoupon(@Body() applyCouponDto: ApplyCouponDto, @Req() req: Request) {
    const userId = req.user['sub'];
    return this.paymentRecruitmentService.applyCoupon(applyCouponDto, userId);
  }

  @ApiOperation({ summary: '결제상품 쿠폰 적용 취소' })
  @Post('coupon/cancel')
  async cancelCoupon(@Body() cancelCouponDto: CancelCouponDto, @Req() req: Request) {
    const userId = req.user['sub'];
    return this.paymentRecruitmentService.cancelCoupon(cancelCouponDto, userId);
  }

  @ApiOperation({ summary: '채용상품 결제정보 상세' })
  @Get(':orderId')
  async getOrderDetails(@Param('orderId') orderId: string, @Req() req: Request) {
    const userId = req.user['sub'];

    return this.paymentRecruitmentService.getOrderDetails(orderId, userId);
  }
}

import { Body, Controller, Post, UseGuards, Req, Patch, Param, Get } from '@nestjs/common';
import { PaymentRecruitmentService } from './payment-recruitment.service';
import { InitiateRecruitmentPaymentDto } from './dto/initiate-recruitment-payment.dto';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../../../common/decorators/metadata/roles.decorator';
import { PassportJwtGuard } from '../../../authentication/auth/guards/passport-jwt.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Request } from 'express';
import { ConfirmRecruitmentPaymentDto } from './dto/confirm-recruitment-payment.dto';

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
    return this.paymentRecruitmentService.confirmRecruitmentPaymentDto(confirmRecruitmentPaymentDto, userId);
  }

  @ApiOperation({ summary: '채용상품 결제정보 상세' })
  @Get(':orderId')
  async getOrderDetails(@Param('orderId') orderId: string, @Req() req: Request) {
    const userId = req.user['sub'];

    return this.paymentRecruitmentService.getOrderDetails(orderId, userId);
  }

  @ApiOperation({ summary: '채용상품 결제상품 쿠폰 적용' })
  @Patch('apply-coupon')
  async applyCoupon(@Body() body: { orderId: string; couponId: string }, @Req() req: Request) {
    const userId = req.user['sub'];
    // return this.paymentRecruitmentService.applyCoupon(body.orderId, body.couponId, userId);
  }
}

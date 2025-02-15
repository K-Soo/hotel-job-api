import { PaymentService } from './payment.service';
import { Controller, UseGuards, Req, Get } from '@nestjs/common';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { Roles } from '../../common/decorators/metadata/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { PassportJwtGuard } from '../../authentication/auth/guards/passport-jwt.guard';

@ApiBearerAuth()
@UseGuards(PassportJwtGuard, RolesGuard)
@Roles('EMPLOYER')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: '상품 결제내역 리스트' })
  @Get()
  async paymentList(@Req() req: Request) {
    const userId = req.user['sub'];

    return this.paymentService.paymentList(userId);
  }
}

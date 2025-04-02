import { Controller, Post, Body } from '@nestjs/common';
import { EmailVerificationService } from './email-verification.service';
import { RequestVerificationDto } from './dto/request-verification.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('email-verification')
export class EmailVerificationController {
  constructor(private readonly service: EmailVerificationService) {}

  @ApiOperation({ summary: '이메일 인증 전송' })
  @Post('request')
  async requestVerification(@Body() dto: RequestVerificationDto) {
    return this.service.requestVerification(dto);
  }

  @ApiOperation({ summary: '이메일 인증 검증' })
  @Post('verify')
  async verify(@Body() body: { token: string }) {
    return this.service.verifyAccountToken(body.token);
  }

  @ApiOperation({ summary: '이메일 검증 성공 시 유저 정보 응답' })
  @Post('verify/account')
  async verifyAccountSuccess(@Body() body: { token: string }) {
    return this.service.verifyAccountSuccess(body.token);
  }
}

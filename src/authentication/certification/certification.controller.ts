import { Body, Controller, Post } from '@nestjs/common';
import { CertificationService } from './certification.service';
import { ResponseStatus } from '../../common/constants/responseStatus';
import { ApiOperation } from '@nestjs/swagger';

@Controller('certification')
export class CertificationController {
  constructor(private readonly certificationService: CertificationService) {}

  @ApiOperation({ summary: '본인인증 요청' })
  @Post('start')
  async certificationStart() {
    const response = await this.certificationService.start();

    return response;
  }

  @Post('verify')
  async certificationVerify(@Body() body: any) {
    const response = await this.certificationService.verifyDnHash(body);

    return response;
  }
}

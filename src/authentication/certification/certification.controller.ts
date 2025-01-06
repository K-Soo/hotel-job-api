import { Controller, Post } from '@nestjs/common';
import { CertificationService } from './certification.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('certification')
export class CertificationController {
  constructor(private readonly certificationService: CertificationService) {}

  @ApiOperation({ summary: '본인인증 요청' })
  @Post('hash-up')
  async hashUp() {
    const response = await this.certificationService.hashUp();
    console.log('response: ', response);

    return response;
  }
}

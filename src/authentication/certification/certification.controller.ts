import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CertificationService } from './certification.service';
import { customHttpException } from '../../common/constants/custom-http-exception';
import { ApiOperation } from '@nestjs/swagger';
import { VerifyDto } from './dto/verify..dto';
@Controller('certification')
export class CertificationController {
  constructor(private readonly certificationService: CertificationService) {}

  @ApiOperation({ summary: '본인인증 요청' })
  @Post('start')
  async certificationStart() {
    const response = await this.certificationService.startCertification();

    return response;
  }

  @Post('verify')
  async certificationVerifyEmployer(@Body() verify: VerifyDto) {
    if (!verify) {
      throw new BadRequestException(customHttpException.CERTIFICATION_BAD_REQUEST);
    }

    const verifyDnHash = await this.certificationService.verifyDnHash(verify);

    const decryptCert = await this.certificationService.decryptCert(verifyDnHash);

    return decryptCert;
  }

  @Post('verify/applicant')
  async certificationVerifyApplicant(@Body() verify: VerifyDto) {
    if (!verify) {
      throw new BadRequestException(customHttpException.CERTIFICATION_BAD_REQUEST);
    }

    const verifyDnHash = await this.certificationService.verifyDnHash(verify);

    const decryptCert = await this.certificationService.decryptCert(verifyDnHash);

    return decryptCert;
  }

  // @Post('verify')
  // async certificationVerify(@Body() verify: VerifyDto) {
  //   if (!verify) {
  //     throw new BadRequestException(customHttpException.CERTIFICATION_BAD_REQUEST);
  //   }

  //   const verifyDnHash = await this.certificationService.verifyDnHash(verify);

  //   const decryptCert = await this.certificationService.decryptCert(verifyDnHash);

  //   return decryptCert;
  // }
}

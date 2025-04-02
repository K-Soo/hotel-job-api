// import {
//   Controller,
//   Post,
//   Body,
//   NotFoundException,
//   BadRequestException,
// } from '@nestjs/common';
// import { EmailVerificationService } from './email-verification.service';
// import { RequestVerificationDto } from './dto/request-verification.dto';
// import { VerifyCodeDto } from './dto/verify-code.dto';

// @Controller('email-verification')
// export class EmailVerificationController {
//   constructor(private readonly service: EmailVerificationService) {}

//   @Post('request')
//   async requestVerification(@Body() dto: RequestVerificationDto) {
//     const result = await this.service.requestVerification(dto);
//     if (!result) throw new NotFoundException('해당 아이디와 이메일이 일치하지 않습니다.');
//     return { message: '인증코드를 전송했습니다.' };
//   }

//   @Post('verify')
//   async verifyCode(@Body() dto: VerifyCodeDto) {
//     const verified = await this.service.verifyCode(dto);
//     if (!verified) throw new BadRequestException('코드가 일치하지 않거나 만료되었습니다.');
//     return { message: '인증 성공' };
//   }
// }

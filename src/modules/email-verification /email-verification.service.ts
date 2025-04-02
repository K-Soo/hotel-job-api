// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { EmailVerification } from './entities/email-verification.entity';
// import { Repository } from 'typeorm';
// import { RequestVerificationDto } from './dto/request-verification.dto';
// import { VerifyCodeDto } from './dto/verify-code.dto';
// import { verificationConstants } from './constants/verification.constants';
// import { EmailVerificationMailer } from './email-verification.mailer';

// // 예시용 userService (유저 테이블 확인용)
// import { UserService } from '../users/user.service'; // 너의 구조에 맞게 수정 필요

// @Injectable()
// export class EmailVerificationService {
//   constructor(
//     @InjectRepository(EmailVerification)
//     private readonly repo: Repository<EmailVerification>,
//     private readonly mailer: EmailVerificationMailer,
//     private readonly userService: UserService,
//   ) {}

//   async requestVerification(dto: RequestVerificationDto): Promise<boolean> {
//     const { userId, email } = dto;

//     const user = await this.userService.findByUserIdAndEmail(userId, email);
//     if (!user) return false;

//     const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6자리
//     const expiredAt = new Date(Date.now() + verificationConstants.EXPIRES_IN_MS);

//     const verification = this.repo.create({ userId, email, code, expiredAt });
//     await this.repo.save(verification);

//     await this.mailer.sendVerificationEmail(email, code);
//     return true;
//   }

//   async verifyCode(dto: VerifyCodeDto): Promise<boolean> {
//     const { userId, email, code } = dto;

//     const record = await this.repo.findOne({
//       where: { userId, email, code, verified: false },
//       order: { createdAt: 'DESC' },
//     });

//     if (!record || record.expiredAt.getTime() < Date.now()) return false;

//     record.verified = true;
//     await this.repo.save(record);
//     return true;
//   }
// }

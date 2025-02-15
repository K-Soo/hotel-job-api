import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { CertificationStatus, VerificationStatus, AccountStatus } from '../../../common/constants/app.enum';
import { CertificationResponseDto } from '../../../authentication/certification/dto/certification.response.dto';
import { MembershipResponseDto } from '../../../modules/membership/dto/membership-response.dto';

export class EmployerResponseDto {
  // @ApiProperty({ description: '사업자 유저 아이디', example: 'kana123' })
  // @Expose({ groups: ['account'] })
  // userId: string;

  @ApiProperty({ description: '닉네임', example: '12345678' })
  @Expose()
  nickname: string;

  @ApiProperty({ description: '현재점수', example: '111010' })
  @Expose()
  totalScore: number;

  @ApiProperty({ description: '현재 포인트', example: '111010' })
  @Expose()
  totalPoint: number;

  @ApiProperty({ description: '인증정보', example: 'UNVERIFIED' })
  @Expose()
  certificationStatus: CertificationStatus;

  @ApiProperty({ description: '회원상태', example: AccountStatus.ACTIVE })
  @Expose()
  accountStatus: AccountStatus;

  @ApiProperty({ description: '회사 인증', example: VerificationStatus.VERIFIED })
  @Expose()
  companyVerificationStatus: VerificationStatus;

  @ApiProperty({ description: '생성일', example: new Date() })
  @Expose()
  createdAt: Date;

  @ApiProperty({ description: '비밀번호 변경 일자', example: null })
  @Expose()
  passwordChangedAt: Date;

  // @ApiProperty({ description: '본인인증 정보', example: 'null' })
  // @Expose()
  // @Type(() => CertificationResponseDto)
  // certification: CertificationResponseDto | null;

  @ApiProperty({ description: '멤버십정보', example: 'null' })
  @Expose()
  @Type(() => MembershipResponseDto)
  membership: MembershipResponseDto;
}

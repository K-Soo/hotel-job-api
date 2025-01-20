import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class CertificationResponseDto {
  @ApiProperty({ description: '생년월일', example: '19911029' })
  @Expose()
  birth_day: string;

  @ApiProperty({ description: '인증 타입', example: 'EMPLOYER' })
  @Expose()
  certificationType: string;

  @ApiProperty({ description: '전화번호', example: '01012345678' })
  @Expose({ groups: ['account'] })
  phone_no: string;

  @ApiProperty({ description: '이름', example: '홍길동' })
  @Expose({ groups: ['company'] })
  user_name: string;

  @ApiProperty({ description: '성별 코드 - 남: 01, 여: 02', example: '01' })
  @Expose()
  sex_code: '01' | '02';

  @ApiProperty({ description: '내/외국인 코드 - 내국인: 01, 외국인: 02', example: '01' })
  @Expose()
  local_code: '01' | '02';

  @ApiProperty({ description: '생성일', example: new Date() })
  @Expose()
  createdAt: Date;
}

import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ManagerInfoDto {
  @ApiProperty({ description: '담당자 이름', example: '홍길동' })
  @Expose()
  @IsString()
  @IsNotEmpty()
  managerName: string;

  @ApiProperty({ description: '담당자 이름 비공개', example: false })
  @Expose()
  @IsBoolean()
  @IsNotEmpty()
  isNamePrivate: boolean;

  @ApiProperty({ description: '담당자 연락처', example: 1 })
  @Expose()
  @IsString()
  @IsNotEmpty()
  managerNumber: string;

  @ApiProperty({ description: '담당자 연락처 비공개', example: false })
  @Expose()
  @IsBoolean()
  @IsNotEmpty()
  isNumberPrivate: boolean;

  @ApiProperty({ description: '담당자 이메일', example: 1 })
  @Expose()
  @IsString()
  @IsNotEmpty()
  managerEmail: string;

  @ApiProperty({ description: '담당자 이메일 비공개', example: false })
  @Expose()
  @IsBoolean()
  @IsNotEmpty()
  isEmailPrivate: boolean;
}

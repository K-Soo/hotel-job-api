import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { regex, validationMessage } from '../../../../common/utils/regex';
import { Expose } from 'class-transformer';

export class CreateCompanyDto {
  @Expose()
  @ApiProperty({ description: '사업자 번호', example: '1000000000' })
  @Length(10, 10, validationMessage('businessRegistrationNumber'))
  @Matches(regex.NUMBER, validationMessage('businessRegistrationNumber regex'))
  @IsString()
  @IsNotEmpty()
  businessRegistrationNumber: string;

  @Expose()
  @ApiProperty({ description: '회사명', example: '셀레스타라' })
  @Length(2, 30, validationMessage('companyName'))
  @Matches(regex.FIRST_SPACE, validationMessage('companyName regex'))
  @Matches(regex.LAST_SPACE, validationMessage('companyName regex'))
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @Expose()
  @ApiProperty({ description: '대표자', example: '셀레스타라' })
  @Length(2, 10, validationMessage('businessOwner'))
  @Matches(regex.FIRST_SPACE, validationMessage('businessOwner regex'))
  @Matches(regex.LAST_SPACE, validationMessage('businessOwner regex'))
  @Matches(regex.KOREAN, validationMessage('businessOwner regex'))
  @Matches(regex.GATHER, validationMessage('businessOwner regex'))
  @Matches(regex.CONSONANT, validationMessage('managerName regex'))
  @IsString()
  @IsNotEmpty()
  businessOwner: string;

  @Expose()
  @ApiProperty({ description: '주소', example: '경기도 남양주' })
  @Length(2, 30, validationMessage('address'))
  @IsString()
  @IsNotEmpty()
  address: string;

  @Expose()
  @ApiProperty({ description: '상세주소', example: '201호' })
  @Length(2, 30, validationMessage('addressDetail'))
  @IsString()
  @IsNotEmpty()
  addressDetail: string;

  @Expose()
  @ApiProperty({ description: '담당자명', example: '고길동' })
  @Length(2, 10, validationMessage('managerName'))
  @Matches(regex.FIRST_SPACE, validationMessage('managerName regex'))
  @Matches(regex.LAST_SPACE, validationMessage('managerName regex'))
  @Matches(regex.KOREAN, validationMessage('managerName regex'))
  @Matches(regex.GATHER, validationMessage('managerName regex'))
  @Matches(regex.CONSONANT, validationMessage('businessOwner regex'))
  @IsString()
  @IsNotEmpty()
  managerName: string;

  @Expose()
  @ApiProperty({ description: '담당자 연락처', example: '01012341234' })
  @Length(11, 11, validationMessage('managerNumber'))
  @IsString()
  @IsNotEmpty()
  managerNumber: string;

  @Expose()
  @ApiProperty({ description: '담당자 이메일', example: 'kanabun@naver.com' })
  @Length(5, 40, validationMessage('managerEmail'))
  @IsString()
  @IsEmail()
  managerEmail: string;
}

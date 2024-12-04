import { ApiProperty } from '@nestjs/swagger';
import { CreateEmployerDto } from '../../../modules/employers/dto/create-employer.dto';
import { PickType } from '@nestjs/mapped-types';

export class SignInDto extends PickType(CreateEmployerDto, ['userId', 'password'] as const) {
  @ApiProperty({ description: '아이디', example: 'kanabun102' })
  userId: string;

  @ApiProperty({ description: '비밀번호', example: '@@EErr1234' })
  password: string;
}

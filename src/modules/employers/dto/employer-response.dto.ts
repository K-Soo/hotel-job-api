import { Expose } from 'class-transformer';
import { CreateEmployerDto } from './create-employer.dto';
import { PickType } from '@nestjs/mapped-types';

export class EmployerResponseDto extends PickType(CreateEmployerDto, ['userId']) {
  @Expose()
  accessToken: string;
}

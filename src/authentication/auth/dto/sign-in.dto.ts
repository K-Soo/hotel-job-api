import { CreateEmployerDto } from '../../../modules/employers/dto/create-employer.dto';
import { PickType } from '@nestjs/mapped-types';

export class SignInDto extends PickType(CreateEmployerDto, ['userId', 'password'] as const) {}

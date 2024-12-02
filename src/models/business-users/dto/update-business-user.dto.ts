import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessUserDto } from './create-business-user.dto';

export class UpdateBusinessUserDto extends PartialType(CreateBusinessUserDto) {}

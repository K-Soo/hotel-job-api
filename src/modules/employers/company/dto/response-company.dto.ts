import { PartialType } from '@nestjs/swagger';
import { CreateCompanyDto } from './create-company.dto';

export class ResponseCompanyDto extends PartialType(CreateCompanyDto) {}

import { CreateConsentDto } from '../../../modules/consents/dto/create-consent.dto';
import { CreateEmployerDto } from '../../../modules/employers/dto/create-employer.dto';
import { IntersectionType } from '@nestjs/swagger';

export class CreateSignupDto extends IntersectionType(CreateConsentDto, CreateEmployerDto) {}

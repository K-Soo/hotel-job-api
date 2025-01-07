import { VerifyDto } from './verify..dto';
import { PickType } from '@nestjs/mapped-types';

export class DecryptCertDto extends PickType(VerifyDto, ['ordr_idxx', 'enc_cert_data2', 'dn_hash', 'cert_no']) {}

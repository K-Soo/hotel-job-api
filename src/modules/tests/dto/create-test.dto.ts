import { IsString, IsBoolean } from 'class-validator';
import { CreateConsentDto } from '../../consents/dto/create-consent.dto';
import { PrimaryGeneratedColumn } from 'typeorm';
export class CreateTestDto {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  name: string;

  @IsBoolean()
  personalInfoAgree: boolean;

  @IsBoolean()
  serviceTermsAgree: boolean;

  @IsBoolean()
  marketingAgree: boolean;
}

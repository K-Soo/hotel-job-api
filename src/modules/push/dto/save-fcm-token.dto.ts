import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsDate,
  IsNumber,
  IsEnum,
  ValidateIf,
  Min,
  Length,
  Max,
} from 'class-validator';

export class SaveFcmTokenDto {
  @ApiProperty({ description: '토큰', example: 'ABCD' })
  @IsString()
  token: string;

  @ApiProperty({ description: 'PWA 여부', example: false })
  @IsBoolean()
  isPWA: boolean;
}

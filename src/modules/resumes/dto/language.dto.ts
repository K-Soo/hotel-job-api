import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Language, Proficiency } from '../../../common/constants/app.enum';

export class LanguageDto {
  @ApiProperty({
    description: '언어',
    example: Language.ENGLISH,
    enum: Language,
  })
  @IsEnum(Language, { message: 'language must be a valid Language enum value' })
  name: Language;

  @ApiProperty({
    description: '숙련도 (BEGINNER, INTERMEDIATE, ADVANCED, NATIVE)',
    example: 'NATIVE',
    enum: Proficiency,
  })
  @IsEnum(Proficiency, { message: 'Proficiency must be a valid Proficiency enum value' })
  level: Proficiency;
}

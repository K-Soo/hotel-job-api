import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches, ValidateIf } from 'class-validator';

export class CreateBusinessUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 30, {
    message: 'username Length Invalid format.',
  })
  @Matches(/^[a-z0-9]+$/, { message: 'username Matches Invalid format.' })
  userId: string;
}

import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches, ValidateIf } from 'class-validator';
import { regex } from '../../../common/utils/regex';
export class CreateEmployerDto {
	@IsString()
	@IsNotEmpty()
	@Length(5, 20, { message: 'username Length Invalid format' })
	@Matches(regex.USER_ID, { message: 'userId Invalid format' })
	userId: string;

	@IsString()
	@IsNotEmpty()
	@Matches(regex.ALL_SPACE, { message: 'name Invalid format' })
	name: string;
}

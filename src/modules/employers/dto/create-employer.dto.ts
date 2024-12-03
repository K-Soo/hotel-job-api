import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches, ValidateIf } from 'class-validator';
import { regex, validationMessage } from '../../../common/utils/regex';
export class CreateEmployerDto {
	@IsString()
	@IsNotEmpty()
	@Length(5, 20, validationMessage('userId'))
	@Matches(regex.USER_ID, validationMessage('userId'))
	userId: string;

	@IsString()
	@IsNotEmpty()
	@Matches(regex.ALL_SPACE, validationMessage('name'))
	name: string;

	@IsString()
	@IsNotEmpty()
	@Matches(regex.PASSWORD, validationMessage('password'))
	password: string;
}

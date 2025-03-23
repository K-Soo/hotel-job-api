import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { Strategy } from 'passport-local';
import { SignInDto } from '../dto/sign-in.dto';
import { validate } from 'class-validator';
import { EmployersService } from '../../../modules/employers/employers.service';
import { EmployerUser } from 'src/common/interfaces/user.interface';
import { handleAccountStatus } from '../../../common/helpers/account.helper';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly employersService: EmployersService) {
    super({
      usernameField: 'userId',
      passwordField: 'password',
    });
  }

  async validate(userId: string, password: string): Promise<EmployerUser> {
    const dto = plainToInstance(SignInDto, { userId, password });
    const errors = await validate(dto);

    if (errors.length > 0) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }
    const user = await this.employersService.validateEmployerUser({ userId, password });

    handleAccountStatus(user.accountStatus);

    return user;
  }
}

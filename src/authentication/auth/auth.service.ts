import { Body, HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtConfigService } from './jwt-config.service';
import { SignInDto } from './dto/sign-in.dto';
import { comparePassword } from '../../common/helpers/password.helper';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employer } from '../../modules/employers/entities/employer.entity';
import { EmployersService } from '../../modules/employers/employers.service';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Employer) private repo: Repository<Employer>,
    private readonly jwtService: JwtService,
    private readonly jwtConfigService: JwtConfigService,
    private readonly employersService: EmployersService,
  ) {}

  async signIn(signInDto: SignInDto) {
    try {
      const user = await this.employersService.validateEmployerUser(signInDto);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async generateAccessToken(id: number): Promise<string> {
    const payload = { sub: id };

    const config = this.jwtConfigService.getAccessTokenConfig();
    return this.jwtService.sign(payload, config);
  }

  async generateRefreshToken(id: number): Promise<string> {
    const payload = { sub: id };

    const config = this.jwtConfigService.getRefreshTokenConfig();
    return this.jwtService.sign(payload, config);
  }
}

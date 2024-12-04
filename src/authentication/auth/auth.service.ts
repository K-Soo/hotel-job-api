import { Body, HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtConfigService } from './jwt-config.service';
import { SignInDto } from './dto/sign-in.dto';
import { comparePassword } from '../../common/helpers/password.helper';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employer } from '../../modules/employers/entities/employer.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Employer) private repo: Repository<Employer>,
    private readonly jwtService: JwtService,
    private readonly jwtConfigService: JwtConfigService,
  ) {}

  async signIn(signInDto: SignInDto) {
    try {
      const employerUser = await this.repo.findOne({ where: { userId: signInDto.userId } });
      if (!employerUser) {
        throw new Error('Invalid credentials.');
      }
      const isPasswordValid = await comparePassword(signInDto.password, employerUser.password);
      if (!isPasswordValid) {
        throw new Error('Invalid credentials.');
      }
      return employerUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
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

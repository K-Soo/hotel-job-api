import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtConfigService } from './jwt-config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly jwtConfigService: JwtConfigService,
  ) {}

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

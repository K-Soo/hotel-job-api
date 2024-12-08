import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtConfigService } from './jwt-config.service';
import { Payload } from './interfaces/payload.interface';
import { ProviderRoleType } from '../../common/types';
import { EmployersService } from '../../modules/employers/employers.service';
import { ApplicantsService } from '../../modules/applicants/applicants.service';
import { customHttpException } from '../../common/constants/custom-http-exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly jwtConfigService: JwtConfigService,
    private readonly employersService: EmployersService,
    private readonly applicantsService: ApplicantsService,
  ) {}

  private async validateRefreshToken(provider: ProviderRoleType, id: string) {
    if (provider !== 'LOCAL') {
      const user = await this.applicantsService.findOne(id);
      if (!user) {
        throw new Error();
      }
      return user;
    }

    const user = await this.employersService.findOne(id);
    if (!user) {
      throw new Error();
    }
    return user;
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const refreshTokenPayload = this.refreshTokenVerify(refreshToken);
      return this.validateRefreshToken(refreshTokenPayload.provider, refreshTokenPayload.id);
    } catch (error) {
      console.error('REFRESH_TOKEN_INVALID_CREDENTIALS ERROR: ', error);
      throw new ForbiddenException(customHttpException.REFRESH_TOKEN_INVALID_CREDENTIALS);
    }
  }

  async generateAccessToken(id: string, provider: ProviderRoleType): Promise<string> {
    const payload = { id, provider, iss: 'hotel-job-connect' };
    const config = this.jwtConfigService.getAccessTokenConfig();
    return this.jwtService.sign(payload, config);
  }

  async generateRefreshToken(id: string, provider: ProviderRoleType): Promise<string> {
    const payload = { id, provider, iss: 'hotel-job-connect' };
    const config = this.jwtConfigService.getRefreshTokenConfig();
    return this.jwtService.sign(payload, config);
  }

  accessTokenVerify(token: string): Payload {
    return this.jwtService.verify(token, this.jwtConfigService.getAccessTokenConfig());
  }

  refreshTokenVerify(token: string): Payload {
    return this.jwtService.verify(token, this.jwtConfigService.getRefreshTokenConfig());
  }
}

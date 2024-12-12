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

  private async getUserByProvider(provider: ProviderRoleType, id: string) {
    if (provider !== 'LOCAL') {
      const existingApplicantUser = await this.applicantsService.findOne(id);
      if (!existingApplicantUser) {
        throw new Error('Applicant not found');
      }
      return existingApplicantUser;
    }

    const existingEmployerUser = await this.employersService.findOne(id);
    if (!existingEmployerUser) {
      throw new Error('Employer not found');
    }
    return existingEmployerUser;
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const refreshTokenPayload = this.refreshTokenVerify(refreshToken);
      console.log('refreshTokenPayload: ', refreshTokenPayload);
      return this.getUserByProvider(refreshTokenPayload.provider, refreshTokenPayload.sub);
    } catch (error) {
      console.error('REFRESH_TOKEN_INVALID_CREDENTIALS ERROR: ', error);
      throw new ForbiddenException(customHttpException.REFRESH_TOKEN_INVALID_CREDENTIALS);
    }
  }

  async generateAccessToken(id: string, provider: ProviderRoleType): Promise<string> {
    const payload = { sub: id, provider, iss: 'hotel-job-connect' };
    const config = this.jwtConfigService.getAccessTokenConfig();
    return this.jwtService.sign(payload, config);
  }

  async generateRefreshToken(id: string, provider: ProviderRoleType): Promise<string> {
    const payload = { sub: id, provider, iss: 'hotel-job-connect' };
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

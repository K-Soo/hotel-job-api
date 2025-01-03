import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtConfigService } from './jwt-config.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ProviderType, RoleType } from '../../common/types';
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

  async getUserByProvider(provider: ProviderType, uuid: string) {
    if (provider !== 'LOCAL') {
      const existingApplicantUser = await this.applicantsService.findOne(uuid);
      if (!existingApplicantUser) {
        throw new NotFoundException(customHttpException.NOT_FOUND_USER);
      }
      return existingApplicantUser;
    }

    if (provider === 'LOCAL') {
      const existingEmployerUser = await this.employersService.findOneUuid(uuid);
      if (!existingEmployerUser) {
        throw new NotFoundException(customHttpException.NOT_FOUND_USER);
      }
      return existingEmployerUser;
    }
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const refreshTokenPayload = this.refreshTokenVerify(refreshToken);
      return this.getUserByProvider(refreshTokenPayload.provider, refreshTokenPayload.sub);
    } catch (error) {
      console.error('REFRESH_TOKEN_INVALID_CREDENTIALS ERROR: ', error);
      throw new ForbiddenException(customHttpException.REFRESH_TOKEN_INVALID_CREDENTIALS);
    }
  }

  async generateAccessToken(id: string, provider: ProviderType, role: RoleType): Promise<string> {
    const payload = { sub: id, provider, iss: 'hotel-job-connect', role };
    const config = this.jwtConfigService.getAccessTokenConfig();
    return this.jwtService.sign(payload, config);
  }

  async generateRefreshToken(id: string, provider: ProviderType): Promise<string> {
    const payload = { sub: id, provider, iss: 'hotel-job-connect' };
    const config = this.jwtConfigService.getRefreshTokenConfig();
    return this.jwtService.sign(payload, config);
  }

  accessTokenVerify(token: string): JwtPayload {
    return this.jwtService.verify(token, this.jwtConfigService.getAccessTokenConfig());
  }

  refreshTokenVerify(token: string): JwtPayload {
    return this.jwtService.verify(token, this.jwtConfigService.getRefreshTokenConfig());
  }
}

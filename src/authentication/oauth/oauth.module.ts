import { Module } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { OauthController } from './oauth.controller';
import { KakaoCustomStrategy } from './strategies/kakao-custom.strategy';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from '../auth/auth.module';
import { ApplicantsModule } from '../../modules/applicants/applicants.module';

@Module({
  imports: [HttpModule, AuthModule, ApplicantsModule],
  controllers: [OauthController],
  providers: [OauthService, KakaoCustomStrategy],
})
export class OauthModule {}

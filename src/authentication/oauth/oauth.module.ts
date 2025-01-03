import { Module } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { OauthController } from './oauth.controller';
import { KakaoCustomStrategy } from './strategies/kakao-custom.strategy';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from '../auth/auth.module';
import { ApplicantsModule } from '../../modules/applicants/applicants.module';
import { JwtModule } from '@nestjs/jwt';
import { ConsentsModule } from '../../modules/consents/consents.module';
import { UsersModule } from '../../modules/users/users.module';
@Module({
  imports: [HttpModule, AuthModule, ApplicantsModule, JwtModule, ConsentsModule, UsersModule],
  controllers: [OauthController],
  providers: [OauthService, KakaoCustomStrategy],
})
export class OauthModule {}

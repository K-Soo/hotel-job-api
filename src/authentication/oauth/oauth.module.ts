import { Module } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { OauthController } from './oauth.controller';
import { KakaoCustomStrategy } from './strategies/kakao-custom.strategy';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [OauthController],
  providers: [OauthService, KakaoCustomStrategy],
})
export class OauthModule {}

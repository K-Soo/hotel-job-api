import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtConfigService } from './jwt-config.service';
import { JwtModule } from '@nestjs/jwt';
import { EmployersModule } from '../../modules/employers/employers.module';
import { ApplicantsModule } from '../../modules/applicants/applicants.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { ConsentsModule } from '../../modules/consents/consents.module';
@Module({
  controllers: [AuthController],
  imports: [JwtModule.register({}), EmployersModule, PassportModule, ApplicantsModule, ConsentsModule],
  providers: [AuthService, JwtConfigService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

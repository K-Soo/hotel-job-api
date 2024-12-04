import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtConfigService } from './jwt-config.service';
import { JwtModule } from '@nestjs/jwt';
import { EmployersModule } from '../../modules/employers/employers.module';
import { EmployersService } from '../../modules/employers/employers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employer } from '../../modules/employers/entities/employer.entity';
import { PassportModule } from '@nestjs/passport';
@Module({
  controllers: [AuthController],
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([Employer]), forwardRef(() => EmployersModule)],
  providers: [AuthService, JwtConfigService, EmployersService],
  exports: [AuthService],
})
export class AuthModule {}

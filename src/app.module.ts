import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from './config/database/postgres/configuration';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SwaggerConfigModule } from './config/swagger/swagger.config.module';
import { RefreshTokenMiddleware } from './common/middlewares/refresh-token.middleware';

import { EmployersModule } from './modules/employers/employers.module';
import { HealthModule } from './modules/health/health.module';
import { TestsModule } from './modules/tests/tests.module';
import { ApplicantsModule } from './modules/applicants/applicants.module';
import { AuthModule } from './authentication/auth/auth.module';
import { OauthModule } from './authentication/oauth/oauth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(configuration),
    SwaggerConfigModule,
    HealthModule,
    TestsModule,
    EmployersModule,
    ApplicantsModule,
    AuthModule,
    OauthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RefreshTokenMiddleware).forRoutes('*');
  }
}

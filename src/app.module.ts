import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './models/health/health.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from './config/database/postgres/configuration';
import { TestsModule } from './models/tests/tests.module';
import { BusinessUsersModule } from './models/business-users/business-users.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HealthModule,
    TypeOrmModule.forRootAsync(configuration),
    TestsModule,
    BusinessUsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor }],
})
export class AppModule {}

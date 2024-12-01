import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './models/health/health.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from './config/database/postgres/configuration';
import { TestsModule } from './models/tests/tests.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HealthModule,
    TypeOrmModule.forRootAsync(configuration),
    TestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

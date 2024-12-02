import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const configuration: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    console.log(__dirname);
    return {
      type: 'postgres',
      // host: configService.get('DB_HOST'),
      host: 'dev-hotel-job-api-db.c5msqsekurzz.ap-northeast-2.rds.amazonaws.com',
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: 'postgres',
      retryAttempts: 1,
      entities: ['dist/**/*.entity.js'],
      synchronize: configService.get('APP_ENV') === 'local',
      ssl: {
        rejectUnauthorized: false,
      },
      // autoLoadEntities: true, // 개쌉중요해 EntityMetadataNotFoundError 에러 났었음.
    };
  },
};

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const configuration: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const isLocal = configService.get('APP_ENV') === 'local';
    return {
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      retryAttempts: 1,
      entities: ['dist/**/*.entity.js'],
      namingStrategy: new SnakeNamingStrategy(), // 스네이크케이스로 변환
      synchronize: isLocal,
      connectTimeoutMS: 1000, // 1ms로 강제 타임아웃 설정

      ...(!isLocal && { ssl: { rejectUnauthorized: false } }),
      // autoLoadEntities: true, // 개쌉중요해 EntityMetadataNotFoundError 에러 났었음.
    };
  },
};

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const configuration: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    console.log(__dirname);
    return {
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      retryAttempts: 1,
      entities: ['dist/**/*.entity.js'],
      synchronize: configService.get('APP_ENV') === 'local',
      // autoLoadEntities: true, // 개쌉중요해 EntityMetadataNotFoundError 에러 났었음.
    };
  },
};

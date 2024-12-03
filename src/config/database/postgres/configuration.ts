import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const configuration: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    console.log('configuration', __dirname);
    console.log('DB_NAME:', configService.get<string>('DB_NAME'));
    console.log('DB_HOST:', configService.get<string>('DB_HOST'));
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
      // ssl: {
      //   rejectUnauthorized: false,
      // },
      // autoLoadEntities: true, // 개쌉중요해 EntityMetadataNotFoundError 에러 났었음.
    };
  },
};

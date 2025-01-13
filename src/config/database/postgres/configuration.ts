import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSource } from 'typeorm';
export const configuration: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const isLocal = configService.get('APP_ENV') === 'local';
    const logger = new Logger('DatabaseConnection');
    const dataSource = new DataSource({
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      entities: ['dist/**/*.entity.js'],
      namingStrategy: new SnakeNamingStrategy(),
      synchronize: isLocal,
      connectTimeoutMS: 1000,
      // useUTC: true,
      // extra: {
      //   options: `-c timezone=Asia/Seoul`,
      // },
      ...(!isLocal && { ssl: { rejectUnauthorized: false } }),
    });

    try {
      await dataSource.initialize();
      logger.log('----- Database connection established successfully! -----');
    } catch (error) {
      logger.error('Failed to connect to the database', error);
      throw error;
    }

    return {
      ...dataSource.options,
    };
  },
};

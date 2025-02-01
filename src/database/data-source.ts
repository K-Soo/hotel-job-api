import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { SeederOptions } from 'typeorm-extension';

ConfigModule.forRoot();

const configService = new ConfigService();

const isLocal = configService.get('APP_ENV') === 'local';

const seederOptions: SeederOptions = {
  // seeds: ['dist/database/seeds/membership.seeder.js'],
  seeds: ['dist/database/seeds/**/*{.js,.ts}'],
  factories: ['dist/database/factories/**/*{.js,.ts}'],
  seedTracking: false,
};

export const postgresDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  namingStrategy: new SnakeNamingStrategy(),
  entities: [`dist/**/*.entity.js`],
  migrations: [`dist/database/migrations/*.js`],
  synchronize: false,
  logging: true,
  ...(!isLocal && { ssl: { rejectUnauthorized: false } }),
  ...seederOptions,
});

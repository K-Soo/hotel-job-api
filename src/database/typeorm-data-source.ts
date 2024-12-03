import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();
const configService = new ConfigService();

export const postgresDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),

  entities: [`dist/**/*.entity.js`],
  migrations: [`dist/database/migrations/*.js`],

  // entities: [`${__dirname}/../src/**/*.entity.ts`], //경로 문제? 개발환경에서는 잘되네
  // migrations: [`${__dirname}/../../database/migrations/*.ts`], //개발 실행
  // 개발환경
  // entities: [`src/**/*.entity{.ts,.js}`], //dev ok,
  // migrations: [`${__dirname}/../../src/database/migrations/*.ts`], //dev ok,
  synchronize: false,
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
});

//마이그레이션 __dirname: /Users/neo/Documents/PROJECT/hotel-jop-server/src/database
//개발환경 __dirname: /Users/neo/Documents/PROJECT/hotel-jop-server/dist/database

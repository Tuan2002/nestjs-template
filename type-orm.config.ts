import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

config();
const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  username: configService.getOrThrow<string>('DATABASE_USERNAME'),
  password: configService.getOrThrow<string>('DATABASE_PASSWORD'),
  host: configService.get<string>('DATABASE_HOST') || 'localhost',
  port: configService.get<number>('DATABASE_PORT') || 5432,
  database: configService.getOrThrow<string>('DATABASE_NAME'),
  namingStrategy: new SnakeNamingStrategy(),
  entities: ['./dist/**/*.entity.js'],
  migrations: ['./dist/**/src/migrations/*.js'],
});


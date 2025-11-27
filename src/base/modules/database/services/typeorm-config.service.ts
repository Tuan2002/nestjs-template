import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) { }

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'postgres',
      username: this.configService.getOrThrow<string>('DATABASE_USERNAME'),
      password: this.configService.getOrThrow<string>('DATABASE_PASSWORD'),
      host: this.configService.get<string>('DATABASE_HOST') || 'localhost',
      port: this.configService.get<number>('DATABASE_PORT') || 5432,
      database: this.configService.getOrThrow<string>('DATABASE_NAME'),
      entities: [],
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(),
      migrations: ['dist/migrations/*{.ts,.js}'],
      logging: this.configService.get('NODE_ENV') !== 'production',
    };
  }
}

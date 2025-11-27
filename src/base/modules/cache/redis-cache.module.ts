import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseCacheService } from './services/redis-cache.service';

@Module({
  imports: [
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'single',
        url: configService.getOrThrow('REDIS_URL'),
        options: {
          keyPrefix: 'CERT_CHAIN:',
        },
      }),
    }),
  ],
  providers: [BaseCacheService],
  exports: [RedisModule, BaseCacheService],
})
export class RedisCacheModule {}

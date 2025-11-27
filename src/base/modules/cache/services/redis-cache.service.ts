import { InjectRedis } from '@nestjs-modules/ioredis';
import { isJSON } from 'class-validator';
import Redis from 'ioredis';

export class BaseCacheService {
  constructor(@InjectRedis() protected redis: Redis) {}

  async setCache<T>(cacheKey: string, value: T, expireTime?: number) {
    const cacheValue =
      typeof value === 'string' ? value : JSON.stringify(value);
    if (expireTime) {
      await this.redis.set(cacheKey, cacheValue, 'EX', expireTime);
      return;
    }
    await this.redis.set(cacheKey, cacheValue);
  }

  async getCache(cacheKey: string) {
    const cacheData = await this.redis.get(cacheKey);
    if (!cacheData) {
      return null;
    }
    return isJSON(cacheData) ? JSON.parse(cacheData) : cacheData;
  }

  async deleteCache(cacheKey: string) {
    return await this.redis.del(cacheKey);
  }

  async addToSet<T>(setKey: string, value: T) {
    const cacheValue =
      typeof value === 'string' ? value : JSON.stringify(value);
    await this.redis.sadd(setKey, cacheValue);
  }

  async getSetMembers(setKey: string) {
    const data = await this.redis.smembers(setKey);
    return data
      ? data.map((item) => (isJSON(item) ? JSON.parse(item) : item))
      : null;
  }

  async removeFromSet(setKey: string, value: string) {
    return this.redis.srem(setKey, value);
  }
}

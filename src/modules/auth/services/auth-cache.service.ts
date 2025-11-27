import { BaseCacheService } from '@base/modules/cache/services/redis-cache.service';
import { CACHES, SecurityOptions } from '@constants';

export class AuthCacheService extends BaseCacheService {
  async setTemporaryLockout(userId: string, lockoutTo: Date) {
    const cacheKey = CACHES.LOCKOUT_SESSION.getKey(userId);
    const value = lockoutTo.toISOString();
    await this.setCache(cacheKey, value, SecurityOptions.LOCKOUT_DURATION);
  }

  async getTemporaryLockout(userId: string) {
    const cacheKey = CACHES.LOCKOUT_SESSION.getKey(userId);
    const lockoutTo = await this.getCache(cacheKey);
    return lockoutTo;
  }

  async setRevokedToken(tokenId: string, expiresIn: number) {
    const cacheKey = CACHES.REVOKED_TOKENS.getKey(tokenId);
    await this.setCache(
      cacheKey,
      tokenId,
      CACHES.REVOKED_TOKENS.expiredTime(expiresIn),
    );
  }

  async isTokenRevoked(tokenId: string) {
    const cacheKey = CACHES.REVOKED_TOKENS.getKey(tokenId);
    const isRevoked = await this.getCache(cacheKey);
    return !!isRevoked;
  }
}

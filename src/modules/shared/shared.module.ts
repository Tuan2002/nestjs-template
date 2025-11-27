import { RedisCacheModule } from '@base/modules/cache/redis-cache.module';
import { ThirdPartyModule } from '@modules/third-party/third-party.module';
import { Global, Module } from '@nestjs/common';
@Global()
@Module({
  imports: [RedisCacheModule, ThirdPartyModule],
  controllers: [],
  providers: [],
  exports: [RedisCacheModule, ThirdPartyModule],
})
export class SharedModule { }

import { AuthCacheService } from '@modules/auth/services/auth-cache.service';
import { AuthorizedContext } from '@modules/auth/types';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly authCacheService: AuthCacheService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
    });
  }

  async validate(payload: AuthorizedContext): Promise<AuthorizedContext> {
    // Check if token has been revoked
    const isRevoked = await this.authCacheService.isTokenRevoked(payload.jti);
    if (isRevoked) {
      throw new UnauthorizedException('Your session has been terminated');
    }
    return {
      ...payload,
    };
  }
}

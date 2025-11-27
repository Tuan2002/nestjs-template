import { AuthCacheService } from '@modules/auth/services/auth-cache.service';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import dayjs from 'dayjs';
@Injectable()
export class LogoutGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authCacheService: AuthCacheService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new BadRequestException(
        'Authorization header is missing or invalid',
      );
    }

    try {
      // Verify the token is valid
      const token = authHeader.split(' ')[1];
      await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const payload = this.jwtService.decode(token);
      // Check if token has required fields
      if (!payload.jti || !payload.exp) {
        throw new UnauthorizedException('Invalid token structure');
      }

      // Check if token is already revoked
      const isRevoked = await this.authCacheService.isTokenRevoked(payload.jti);
      if (isRevoked) {
        throw new UnauthorizedException('Token has already been revoked');
      }

      // Calculate remaining expiration time in seconds
      const expiresIn = dayjs.unix(payload.exp).diff(dayjs(), 'second');
      if (expiresIn > 0) {
        await this.authCacheService.setRevokedToken(payload.jti, expiresIn);
      }
      request.user = payload;
      return true;
    } catch {
      throw new BadRequestException('Invalid or expired token');
    }
  }
}

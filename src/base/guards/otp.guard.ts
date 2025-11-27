import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OTPGuard {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];

    if (!authorizationHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const [bearer, otpToken] = authorizationHeader.split(' ');

    if (bearer !== 'Bearer' || !otpToken) {
      throw new UnauthorizedException('Invalid authorization header format');
    }

    try {
      // Here we use the secret for OTP token (distinct from the main JWT token)
      await this.jwtService.verifyAsync(otpToken, {
        secret: process.env.JWT_OTP_SECRET,
      });
      const decoded = this.jwtService.decode(otpToken);
      request.user = decoded; // Attach user data to the request
      return true;
    } catch {
      throw new UnauthorizedException('Invalid OTP token');
    }
  }
}

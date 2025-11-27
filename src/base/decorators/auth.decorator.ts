import { LogoutGuard } from '@base/guards/logout.guard';
import { OTPGuard } from '@base/guards/otp.guard';
import { RBACGuard } from '@base/guards/rbac.guard';
import { UserRoles } from '@modules/user/enums/roles.enum';
import { UseGuards, applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { Roles } from './roles.decorator';

export function Auth() {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: '401 - Unauthorized' }),
    ApiForbiddenResponse({ description: '403 - Forbidden' }),
  );
}

export function OTPAuth() {
  return applyDecorators(
    UseGuards(OTPGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: '401 - Unauthorized' }),
    ApiForbiddenResponse({ description: '403 - Forbidden' }),
  );
}

export function RBAC(...roles: UserRoles[]) {
  return applyDecorators(
    Roles(...roles),
    UseGuards(JwtAuthGuard),
    UseGuards(RBACGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: '401 - Unauthorized' }),
    ApiForbiddenResponse({ description: '403 - Forbidden' }),
  );
}

export function LOGOUT() {
  return applyDecorators(UseGuards(LogoutGuard), ApiBearerAuth());
}

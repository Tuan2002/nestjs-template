// roles.decorator.ts
import { UserRoles } from '@modules/user/enums/roles.enum';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'ROLES';
export const Roles = (...roles: UserRoles[]) => SetMetadata(ROLES_KEY, roles);

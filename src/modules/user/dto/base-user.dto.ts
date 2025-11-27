import { PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class BaseUserDto extends PickType(User, [
  'id',
  'userName',
  'email',
  'firstName',
  'lastName',
  'gender',
  'avatar',
  'phone',
  'address',
  'dob',
  'role',
  'isLocked',
  'createdAt',
  'deletedAt',
]) {}

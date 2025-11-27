import { PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UpdateUserDto extends PickType(User, [
  'email',
  'firstName',
  'lastName',
  'avatar',
  'dob',
  'address',
  'phone',
  'gender',
  'isLocked',
  'role',
]) {}

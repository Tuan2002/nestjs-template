import { User } from '@modules/user/entities/user.entity';
import { PickType } from '@nestjs/swagger';

export class UpdateInfoDto extends PickType(User, [
  'email',
  'firstName',
  'lastName',
  'avatar',
  'dob',
  'address',
  'phone',
  'gender',
]) {}

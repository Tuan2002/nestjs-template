import { User } from '@modules/user/entities/user.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ResponseToken {
  @ApiProperty()
  @Expose()
  accessToken: string;
  @ApiProperty()
  @Expose()
  expiresAt: Date;
  @ApiProperty()
  @Expose()
  userId: string;
  @ApiProperty()
  @Expose()
  email?: string;
  @ApiProperty()
  @Expose()
  userName: string;
  @ApiProperty()
  @Expose()
  role: string;
}

export class ResponseCurrentUser extends PickType(User, [
  'id',
  'email',
  'userName',
  'firstName',
  'lastName',
  'avatar',
  'dob',
  'gender',
  'phone',
  'isFirstLogin',
  'address',
  'role',
]) { }

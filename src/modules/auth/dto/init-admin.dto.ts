import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class InitialAdminDto {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsString()
  userName: string;
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsString()
  email: string;
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsString()
  password: string;
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsString()
  lastName: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CredentialLoginDto {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsString()
  password: string;
}

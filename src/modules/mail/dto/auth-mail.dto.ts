import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SendForgotMailDto {
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  magicLink: string;

  @IsString()
  @IsOptional()
  code?: string
}

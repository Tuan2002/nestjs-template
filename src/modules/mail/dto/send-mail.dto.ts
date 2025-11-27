import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { JSX } from 'react';

export class SendRawMailDto {
  @IsEmail()
  @IsOptional()
  from?: string | undefined;

  @IsEmail()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  body: string;
}

export class SendReactMailDto {
  @IsEmail()
  @IsOptional()
  from?: string | undefined;

  @IsEmail()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  subject: string;
  
  @IsNotEmpty()
  body: JSX.Element;
}

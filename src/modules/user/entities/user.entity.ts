import { Tables } from '@/enums/tables.enum';
import { AbstractEntity } from '@base/entities/base.entity';
import { Genders } from '@modules/user/enums';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Column, Entity } from 'typeorm';
import { UserRoles } from '../enums/roles.enum';

@Entity(Tables.User)
export class User extends AbstractEntity {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  @IsString()
  @Column({ unique: true })
  userName: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  @IsEmail()
  @Column({ unique: true, nullable: true })
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @Column({ select: false })
  hashedPassword: string;

  @ApiProperty()
  @Expose()
  @Column({ default: false })
  isLocked: boolean;

  @ApiProperty()
  @Column({ default: true })
  isFirstLogin: boolean;

  @ApiProperty()
  @Column({ default: 0 })
  loginFailedTimes: number;

  @ApiProperty({ enum: UserRoles, enumName: 'UserRoles' })
  @IsEnum(UserRoles)
  @Expose()
  @IsNotEmpty()
  @Column({ enum: UserRoles })
  role: UserRoles;

  @ApiProperty({ nullable: true })
  @ValidateIf((o) => o.firstName !== undefined)
  @IsString()
  @Expose()
  @Column({ nullable: true })
  firstName?: string;

  @ApiProperty({ nullable: true })
  @ValidateIf((o) => o.lastName !== undefined)
  @IsString()
  @Expose()
  @Column({ nullable: true })
  lastName?: string;

  @ApiProperty({ nullable: true })
  @ValidateIf((o) => o.walletAddress !== undefined)
  @IsString()
  @Expose()
  @Column({ nullable: true })
  walletAddress?: string;

  @ApiProperty({ nullable: true })
  @ValidateIf((o) => o.address !== undefined)
  @IsString()
  @Expose()
  @Column({ nullable: true })
  address?: string;

  @ApiProperty({ nullable: true })
  @ValidateIf((o) => o.phone !== undefined)
  @IsString()
  @Expose()
  @Column({ nullable: true })
  phone?: string;

  @ApiProperty({ nullable: true })
  @ValidateIf((o) => o.dob !== undefined)
  @IsNotEmpty()
  @Expose()
  @Column({ nullable: true })
  dob?: Date;

  @ApiProperty({
    nullable: true,
    enum: Genders,
    enumName: 'Gender'
  })
  @IsOptional()
  @IsEnum(Genders)
  @Expose()
  @Column({ nullable: true, enum: Genders })
  gender?: Genders;

  @ApiProperty({ nullable: true })
  @ValidateIf((o) => o.avatar !== undefined)
  @IsUrl()
  @Expose()
  @Column({
    nullable: true,
  })
  avatar?: string;
}

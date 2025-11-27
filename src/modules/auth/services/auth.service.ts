import { LOGIN_ERROR_CODES, SecurityOptions } from '@constants';
import { User } from '@modules/user/entities';
import { UserRoles } from '@modules/user/enums/roles.enum';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcryptjs';
import { plainToInstance } from 'class-transformer';
import * as crypto from 'crypto';
import dayjs from 'dayjs';
import { Repository } from 'typeorm';
import { CredentialLoginDto } from '../dto/credential-login.dto';
import { ForgetPasswordDto } from '../dto/forget-password.dto';
import { InitialAdminDto } from '../dto/init-admin.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { AuthorizedContext, ResponseToken } from '../types';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }
  /**
   * Initialize the administrator account with provided data.
   * @param initialData - The initial data for the administrator account.
   * @returns A success message if the account is created successfully.
   * @throws BadRequestException if an administrator account already exists.
   */

  async initializeDataAsync(initialData: InitialAdminDto) {
    const { userName, email, password, firstName, lastName } = initialData;

    const existAdminUser = await this.usersRepository.exists({
      where: { role: UserRoles.ADMIN },
    });

    if (existAdminUser) {
      throw new BadRequestException({
        message:
          'Administrator account already exists. Please go to login page to access administrator dashboard.',
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      SecurityOptions.PASSWORD_SALT_ROUNDS,
    );

    const newUser = this.usersRepository.create({
      userName,
      email,
      hashedPassword: hashedPassword,
      firstName,
      lastName,
      role: UserRoles.ADMIN,
    });
    await this.usersRepository.save(newUser);
    return {
      isSuccess: true,
      message: 'Administrator account created successfully',
    };
  }

  /**
   * Log in using credentials (email and password).
   * @param credentialDto - The data transfer object containing email and password.
   * @returns A response token containing user information and access token.
   * @throws BadRequestException if the login credentials are incorrect or if the account is locked.
   */
  async credentialLoginAsync(
    credentialDto: CredentialLoginDto,
  ): Promise<ResponseToken> {
    const { email, password } = credentialDto;

    const storedUser = await this.usersRepository.findOne({
      where: { email: email },
      select: ['id', 'email', 'hashedPassword', 'userName', 'avatar', 'role'],
    });

    if (!storedUser) {
      throw new BadRequestException({
        message: 'Login credentials is incorrect',
        code: LOGIN_ERROR_CODES.ACCOUNT_NOT_CREATED,
      });
    }

    if (storedUser.isLocked) {
      throw new BadRequestException({
        message: 'Your account is locked. Please contact support',
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      storedUser.hashedPassword,
    );

    if (!isPasswordValid) {
      throw new BadRequestException({
        message: 'Login credentials is incorrect',
        code: LOGIN_ERROR_CODES.PASSWORD_INCORRECT,
      });
    }

    const accessToken = await this.buildToken(storedUser);
    return plainToInstance(
      ResponseToken,
      {
        ...accessToken,
        ...storedUser,
        userId: storedUser.id,
      },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  /**
   * Logout the user by revoking the access token.
   * @returns A object containing userId and a success message.
   * @throws BadRequestException if the logout process fails
   */
  async logoutAsync(
    _context: AuthorizedContext,
  ): Promise<{ userId: string; message: string }> {
    // TODO: Handle logger for users
    const userId = _context?.userId || null;
    return { userId: userId, message: 'Logout successfully' };
  }

  /**
   * Log in using an OTP (One-Time Password).
   * @param otpToken - The OTP token for login.
   * @returns A response token containing user information and access token.
   * @throws BadRequestException if the OTP token is invalid or expired.
   */

  async forgetPasswordAsync(
    forgetPasswordDto: ForgetPasswordDto,
  ): Promise<{ userId: string }> {
    const { email } = forgetPasswordDto;
    const existUser = await this.usersRepository.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        userName: true,
      },
    });
    if (!existUser) {
      throw new BadRequestException({
        message: 'Account with this email does not exist',
      });
    }

    return {
      userId: existUser.id,
    };
  }

  /**
   * Reset the password for a user.
   * @param userId - The ID of the user whose password is to be reset.
   * @param resetPasswordDto - The data transfer object containing the new password.
   * @returns A response token containing user information and access token.
   * @throws BadRequestException if the user does not exist.
   */

  async resetPasswordAsync(
    userId: string,
    resetPasswordDto: ResetPasswordDto,
  ): Promise<ResponseToken> {
    const { newPassword } = resetPasswordDto;
    const existUser = await this.usersRepository.findOne({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        userName: true,
        hashedPassword: true,
      },
    });
    if (!existUser) {
      throw new BadRequestException({
        message: 'User does not exist',
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      SecurityOptions.PASSWORD_SALT_ROUNDS,
    );

    existUser.hashedPassword = hashedPassword;
    await this.usersRepository.save(existUser);
    const accessToken = await this.buildToken(existUser);

    return plainToInstance(
      ResponseToken,
      {
        ...accessToken,
        ...existUser,
      },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  private async buildToken(userInfo: User) {
    const accessToken = await this.jwtService.signAsync(
      {
        jti: crypto.randomUUID(),
        userId: userInfo.id,
        email: userInfo.email,
        userName: userInfo.userName,
        avatar: userInfo?.avatar,
        role: userInfo.role,
      },
      {
        expiresIn: SecurityOptions.JWT_EXPIRATION_TIME,
      },
    );
    const expiresAt = dayjs()
      .add(SecurityOptions.JWT_EXPIRATION_TIME, 'seconds')
      .toDate();
    return { accessToken, expiresAt };
  }

  async buildTokenForUser(userInfo: User) {
    return this.buildToken(userInfo);
  }
}

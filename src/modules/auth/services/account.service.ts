import { SecurityOptions } from '@constants';
import { User } from '@modules/user/entities';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcryptjs';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { ChangePasswordDto, UpdateInfoDto } from '../dto';
import { ResponseCurrentUser } from '../types';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  /**
   * Get the current user's information.
   * @param userId - The ID of the user.
   * @returns The current user's information.
   * @throws BadRequestException if the user does not exist.
   */
  async getCurrentUserAsync(userId: string): Promise<ResponseCurrentUser> {
    const userInfo = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!userInfo) {
      throw new BadRequestException({
        message: 'User does not exist',
      });
    }

    return plainToInstance(ResponseCurrentUser, userInfo, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * Update the current user's profile information.
   * @param userId - The ID of the user.
   * @param updateData - The data to update.
   * @returns The updated user information.
   * @throws BadRequestException if the user does not exist.
   */

  async updateProfileAsync(userId: string, updateData: UpdateInfoDto) {
    const userInfo = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!userInfo) {
      throw new BadRequestException({
        message: 'User does not exist',
      });
    }

    const updatedUser = await this.usersRepository.save({
      ...userInfo,
      ...updateData,
    });

    return plainToInstance(ResponseCurrentUser, updatedUser, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * Change the user's password.
   * @param userId - The ID of the user.
   * @param changePasswordDto - The data containing the old and new passwords.
   * @returns A success message if the password is changed successfully.
   * @throws BadRequestException if the user does not exist or if the old password is incorrect.
   */

  async changePasswordAsync(
    userId: string,
    changePasswordDto: ChangePasswordDto,
  ) {
    const { oldPassword, newPassword } = changePasswordDto;
    const userInfo = await this.usersRepository.findOne({
      where: { id: userId },
      select: ['id', 'hashedPassword'],
    });

    if (!userInfo) {
      throw new BadRequestException({
        message: 'User does not exist',
      });
    }
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userInfo.hashedPassword,
    );

    if (!isPasswordMatch) {
      throw new BadRequestException({
        message: 'Current password is incorrect',
      });
    }

    const newHashedPassword = await bcrypt.hash(
      newPassword,
      SecurityOptions.PASSWORD_SALT_ROUNDS,
    );

    await this.usersRepository.update(
      {
        id: userId,
      },
      {
        hashedPassword: newHashedPassword,
      },
    );

    return {
      isSuccess: true,
      message: 'Password changed successfully',
    };
  }
}

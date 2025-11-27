import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from '../entities';

@Injectable()
export class BaseUserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * Find a user by their ID.
   * @param userId - The ID of the user to find.
   * @returns The user entity if found.
   * @throws NotFoundException if the user is not found.
   */
  async findUserByIdAsync(userId: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException({
        message: `User with ID ${userId} not found`,
        code: 'USER_NOT_FOUND',
      });
    }
    return user;
  }

  /**
   * Find a user by their email.
   * @param email - The email of the user to find.
   * @returns The user entity if found.
   * @throws NotFoundException if the user is not found.
   */
  async findUserByEmailAsync(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException({
        message: `User with email ${email} not found`,
      });
    }
    return user;
  }

  /**
   * Find a user by their wallet address.
   * @param walletAddress - The wallet address of the user to find.
   * @returns The user entity if found.
   * @throws NotFoundException if the user is not found.
   */
  async findUserByWalletAddressAsync(walletAddress: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { walletAddress },
    });
    if (!user) {
      throw new NotFoundException({
        message: `User with wallet address ${walletAddress} not found`,
      });
    }
    return user;
  }

  /**
   * Delete a user by ID.
   * @param userId - The ID of the user to delete.
   * @returns An object containing the deleted user's ID.
   * @throws BadRequestException if the user does not exist.
   */
  async findUsersByListIdsAsync(userIds: string[]): Promise<User[]> {
    return this.usersRepository.find({
      where: {
        id: In(userIds),
      },
    });
  }
}

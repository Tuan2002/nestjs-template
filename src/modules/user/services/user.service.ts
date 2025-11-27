import { QueryOptionsHelper } from '@base/decorators/query-options.decorator';
import { QueryOptionsDto } from '@base/dtos/query-options.dto';
import { SecurityOptions } from '@constants';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcryptjs';
import { plainToInstance } from 'class-transformer';
import randomstring from 'randomstring';
import { Not, Repository } from 'typeorm';
import { BaseUserDto, CreateUserDto, UpdateUserDto } from '../dto';
import { User } from '../entities';
import { BaseUserService } from './base-user.service';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly baseUserService: BaseUserService,
  ) {}

  /**
   * Get all users with pagination.
   * @param queryOptionsDto - Query options for pagination.
   * @returns An object containing the list of users and pagination info.
   */

  async getUsersAsync(queryOptionsDto: QueryOptionsDto) {
    const { getPagination, skip, take } = new QueryOptionsHelper(
      queryOptionsDto,
    );
    const [rawUsers, count] = await this.usersRepository.findAndCount({
      skip,
      take,
    });
    const resPagination = getPagination({
      count,
      total: rawUsers.length,
    });
    const users = rawUsers.map((user) => {
      return plainToInstance(BaseUserDto, user, {
        excludeExtraneousValues: true,
      });
    });

    return { data: users, pagination: resPagination };
  }

  /**
   * Get all deleted users.
   * @returns A list of deleted users.
   */
  async getDeletedUsersAsync() {
    const rawUsers = await this.usersRepository.find({
      withDeleted: true,
      where: {
        deletedAt: Not(null),
      },
      order: {
        deletedAt: 'DESC',
      },
    });
    const userList = rawUsers.map((user) => {
      return plainToInstance(BaseUserDto, user, {
        excludeExtraneousValues: true,
      });
    });
    return userList;
  }

  /**
   * Create a new user.
   * @param createUserDto - Data transfer object for creating a user.
   * @returns The created user object.
   * @throws BadRequestException if the email is already in use.
   */

  async createUserAsync(createUserDto: CreateUserDto): Promise<BaseUserDto> {
    const existUser = await this.usersRepository.find({
      where: {
        email: createUserDto.email,
      },
    });

    if (existUser) {
      throw new BadRequestException({
        message: 'This email is already in use',
      });
    }

    const randomPassword = randomstring.generate();
    const hashedPassword = await bcrypt.hash(
      randomPassword,
      SecurityOptions.PASSWORD_SALT_ROUNDS,
    );
    const newUser = this.usersRepository.create({
      ...createUserDto,
      userName: createUserDto.email,
      hashedPassword,
    });
    const createdUser = await this.usersRepository.save(newUser);
    return plainToInstance(BaseUserDto, createdUser, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * Create a new organization user.
   * @param createUserDto - Data transfer object for creating a user.
   * @returns The created user object.
   * @throws BadRequestException if the email is already in use.
   */
  async createOrganizationUserAsync(createUserDto: CreateUserDto): Promise<{
    id: string;
    email: string;
    password: string;
  }> {
    const existUser = await this.usersRepository.find({
      where: {
        email: createUserDto.email,
      },
    });

    if (existUser) {
      throw new BadRequestException({
        message: 'This email is already in use',
      });
    }

    const randomPassword = randomstring.generate();
    const hashedPassword = await bcrypt.hash(
      randomPassword,
      SecurityOptions.PASSWORD_SALT_ROUNDS,
    );
    const newUser = this.usersRepository.create({
      ...createUserDto,
      userName: createUserDto.email,
      hashedPassword,
    });
    const createdUser = await this.usersRepository.save(newUser);
    return {
      id: createdUser.id,
      email: createdUser.email,
      password: randomPassword,
    };
  }

  /**
   * Update an existing user.
   * @param userId - The ID of the user to update.
   * @param updateData - Data transfer object containing the updated user data.
   * @returns The updated user object.
   * @throws BadRequestException if the email is already in use or if the user does not exist.
   */

  async updateUserAsync(
    userId: string,
    updateData: UpdateUserDto,
  ): Promise<BaseUserDto> {
    const isEmailExist = await this.usersRepository.exists({
      where: {
        email: updateData.email,
        id: Not(userId),
      },
    });
    if (isEmailExist) {
      throw new BadRequestException({
        message: 'This email is already in use',
      });
    }
    const userInfo = await this.baseUserService.findUserByIdAsync(userId);
    const updatedUser = await this.usersRepository.save({
      ...userInfo,
      ...updateData,
    });
    return plainToInstance(BaseUserDto, updatedUser, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * Delete a user by ID.
   * @param userId - The ID of the user to delete.
   * @returns An object containing the deleted user's ID.
   * @throws BadRequestException if the user does not exist.
   */

  async deleteUserAsync(userId: string): Promise<{ userId: string }> {
    const userInfo = await this.baseUserService.findUserByIdAsync(userId);
    await this.usersRepository.softRemove(userInfo);
    return {
      userId: userInfo.id,
    };
  }

  /**
   * Restore a deleted user by ID.
   * @param userId - The ID of the user to restore.
   * @returns An object containing the restored user's ID.
   * @throws BadRequestException if the user does not exist or has not been deleted.
   */

  async restoreUserAsync(userId: string): Promise<{ userId: string }> {
    const userInfo = await this.usersRepository.findOne({
      where: { id: userId },
      withDeleted: true,
    });
    if (!userInfo) {
      throw new BadRequestException({
        message: 'User does not exist or has not been deleted',
      });
    }

    await this.usersRepository.restore(userId);
    return {
      userId: userInfo.id,
    };
  }

  /**
   * Reset a user's password to the default password.
   * @param userId - The ID of the user whose password is to be reset.
   * @returns An object containing the user's ID.
   * @throws BadRequestException if the user does not exist.
   */

  async resetPasswordAsync(userId: string): Promise<{ userId: string }> {
    const userInfo = await this.baseUserService.findUserByIdAsync(userId);
    const hashedPassword = await bcrypt.hash(
      SecurityOptions.DEFAULT_PASSWORD,
      SecurityOptions.PASSWORD_SALT_ROUNDS,
    );
    const updatedUser = await this.usersRepository.save({
      ...userInfo,
      hashedPassword,
    });
    return {
      userId: updatedUser.id,
    };
  }

  /**
   * Get a user by their ID.
   * @param userId - The ID of the user to retrieve.
   * @returns The user object.
   * @throws BadRequestException if the user does not exist.
   */

  async getUserByIdAsync(userId: string): Promise<BaseUserDto> {
    const userInfo = await this.baseUserService.findUserByIdAsync(userId);
    return plainToInstance(BaseUserDto, userInfo, {
      excludeExtraneousValues: true,
    });
  }
}

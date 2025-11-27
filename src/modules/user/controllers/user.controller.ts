import { ApiQueryOptions } from '@base/decorators/api-query-options.decorator';
import { Auth, RBAC } from '@base/decorators/auth.decorator';
import { QueryOptions } from '@base/decorators/query-options.decorator';
import { ApiResponseType } from '@base/decorators/response-swagger.decorator';
import { QueryOptionsDto } from '@base/dtos/query-options.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseUserDto, CreateUserDto, UpdateUserDto } from '../dto';
import { UserRoles } from '../enums';
import { UserService } from '../services';

@ApiTags('Users')
@Auth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @RBAC(UserRoles.ADMIN)
  @ApiOperation({ summary: 'Get all users' })
  @ApiQueryOptions()
  @ApiResponseType(BaseUserDto, { isArray: true })
  @Get('get-users')
  async getAllUsers(@QueryOptions() queryOptions: QueryOptionsDto) {
    return await this.userService.getUsersAsync(queryOptions);
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponseType(BaseUserDto)
  @Get('get-user/:userId')
  async getUserById(@Param('userId') userId: string) {
    return await this.userService.getUserByIdAsync(userId);
  }

  @RBAC(UserRoles.ADMIN)
  @ApiOperation({ summary: 'Get all deleted users' })
  @ApiResponseType(BaseUserDto, { isArray: true })
  @Get('get-deleted-users')
  async getDeletedUsers() {
    return await this.userService.getDeletedUsersAsync();
  }

  @RBAC(UserRoles.ADMIN)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponseType(BaseUserDto)
  @Post('create-user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUserAsync(createUserDto);
  }

  @RBAC(UserRoles.ADMIN)
  @ApiOperation({ summary: 'Update user information' })
  @ApiResponseType(BaseUserDto)
  @Put('update-user/:userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUserAsync(userId, updateUserDto);
  }

  @RBAC(UserRoles.ADMIN)
  @ApiOperation({ summary: 'Delete a user' })
  @Delete('delete-user/:userId')
  async deleteUser(@Param('userId') userId: string) {
    return await this.userService.deleteUserAsync(userId);
  }

  @RBAC(UserRoles.ADMIN)
  @ApiOperation({ summary: 'Restore a deleted user' })
  @Patch('restore-user/:userId')
  async restoreUser(@Param('userId') userId: string) {
    return await this.userService.restoreUserAsync(userId);
  }

  @RBAC(UserRoles.ADMIN)
  @ApiOperation({ summary: 'Reset user password' })
  @Patch('reset-password/:userId')
  async resetPassword(@Param('userId') userId: string) {
    return await this.userService.resetPasswordAsync(userId);
  }
}

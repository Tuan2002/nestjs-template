import { SharedModule } from '@modules/shared/shared.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers';
import { User } from './entities/user.entity';
import { BaseUserService, UserService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([User]), SharedModule],
  controllers: [UserController],
  providers: [BaseUserService, UserService],
  exports: [BaseUserService, UserService],
})
export class UserModule {}

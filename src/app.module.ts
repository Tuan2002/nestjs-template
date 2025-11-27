import { ConfigAppModule } from '@base/modules/configs/config-app.module';
import { DatabaseModule } from '@base/modules/database/database.module';
import { AuthModule } from '@modules/auth/auth.module';
import { CommonModule } from '@modules/common/common.module';
import { CronjobModule } from '@modules/cronjob/cronjob.module';
import { SharedModule } from '@modules/shared/shared.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MailModule } from './modules/mail/mail.module';
import { QueueModule } from './modules/queue/queue.module';

@Module({
  imports: [
    ConfigAppModule,
    DatabaseModule,
    SharedModule,
    PassportModule,
    CommonModule,
    AuthModule,
    UserModule,
    MailModule,
    CronjobModule,
    QueueModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

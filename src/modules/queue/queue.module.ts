import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import basicAuth from 'express-basic-auth';
import { MailModule } from '../mail/mail.module';
import { QueueNames } from './enums';
import {
  OrganizationMailProcessor
} from './processors';
import {
  OrganizationMailQueueService
} from './services';

@Module({
  imports: [
    MailModule,
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        connection: {
          url: configService.getOrThrow<string>('REDIS_URL'),
        },
      }),
    }),
    BullModule.registerQueue(
      { name: QueueNames.ORGANIZATION_MAILS },
    ),
    BullBoardModule.forFeature(
      {
        name: QueueNames.ORGANIZATION_MAILS,
        adapter: BullMQAdapter,
      },
    ),
    BullBoardModule.forRoot({
      route: '/queues',
      adapter: ExpressAdapter,
      middleware: basicAuth({
        challenge: true,
        users: { admin: process.env.BULL_ADMIN_PASSWORD },
      }),
    }),
  ],
  controllers: [],
  providers: [
    OrganizationMailQueueService,
    OrganizationMailProcessor,
  ],
  exports: [
    OrganizationMailQueueService
  ],
})
export class QueueModule { }

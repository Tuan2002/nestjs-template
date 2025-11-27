import { Module } from '@nestjs/common';
import { MailService } from './services';
import { OrganizationMailService } from './services/organization-mail.service';

@Module({
  controllers: [],
  providers: [
    MailService, 
    OrganizationMailService
  ],
  exports: [
    OrganizationMailService
  ],
})
export class MailModule {}
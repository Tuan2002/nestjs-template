import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { SendRawMailDto, SendReactMailDto } from '../dto';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private mailServiceClient: Resend;
  private mailDomain: string;

  constructor(private readonly configService: ConfigService) {
    this.mailServiceClient = new Resend(
      this.configService.getOrThrow<string>('RESEND_API_KEY'),
    );
    this.mailDomain = this.configService.getOrThrow<string>('MAIL_DOMAIN');
  }

  /**
   * Send raw email using Resend service
   * @param sendMailDto Data transfer object containing email details
   * @returns A promise that resolves when the email is sent
   */
  async sendRawMail(sendMailDto: SendRawMailDto): Promise<void> {
    const { from, to, subject, body } = sendMailDto;
    await this.mailServiceClient.emails
      .send({
        from: from || `noreply@${this.mailDomain}`,
        to,
        subject,
        html: body,
      })
  }

  /**   
   * Send React email using Resend service
   * @param sendMailDto Data transfer object containing email details
   * @returns A promise that resolves when the email is sent
   */
  async sendReactMail(sendMailDto: SendReactMailDto): Promise<void> {
    const { from, to, subject, body } = sendMailDto;
    await this.mailServiceClient.emails
      .send({
        from: from || `noreply@${this.mailDomain}`,
        to,
        subject: subject,
        react: body,
      })
  }
}

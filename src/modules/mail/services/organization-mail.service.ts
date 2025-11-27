import { OrganizationApprovedEmail, OrganizationRegisteredEmail, OrganizationRejectedEmail } from "@/templates/organization";
import { Injectable, Logger } from "@nestjs/common";
import { SendOrgApprovedMailDto, SendOrgRegisteredMailDto, SendOrgRejectedMailDto } from "../dto";
import { MailService } from "./mail.service";

@Injectable()
export class OrganizationMailService {
  private readonly logger = new Logger(OrganizationMailService.name);
  constructor(
    private readonly mailService: MailService,
  ) {}

  /**   
   * Send organization registered email
   * @param sendRegisteredMailDto Data transfer object containing email details
   * @returns A promise that resolves when the email is sent
   */
  async sendOrganizationRegisteredAsync(sendRegisteredMailDto: SendOrgRegisteredMailDto): Promise<void> {
    const { to, organizationName, ownerName } = sendRegisteredMailDto;
    const subject = 'CertChain - Organization Registered';
    const body = OrganizationRegisteredEmail({
      organizationName,
      ownerName,
    });

    return this.mailService.sendReactMail({
      to,
      subject,
      body,
    }).catch((error) => {
      this.logger.error(`Failed to send organization registered email to ${to}: ${error.message}`);
      throw new Error(`Error sending organization registered email: ${error.message}`);
    });
  }

  /**   
   * Send organization approved email
   * @param sendApprovedMailDto Data transfer object containing email details
   * @returns A promise that resolves when the email is sent
   */
  async sendOrganizationApprovedAsync(sendApprovedMailDto: SendOrgApprovedMailDto): Promise<void> {
    const { 
      to, 
      organizationName, 
      ownerName, 
      account, 
      password, 
      approvedAt 
    } = sendApprovedMailDto;
    const subject = 'CertChain - Organization Approved';
    const body = OrganizationApprovedEmail({
      organizationName,
      ownerName,
      account,
      password,
      approvedAt,
    });
    
    return this.mailService.sendReactMail({
      to,
      subject,
      body,
    }).catch((error) => {
      throw new Error(`Error sending organization approved email: ${error.message}`);
    });
  }

  /**   
   * Send organization rejected email
   * @param sendRejectedMailDto Data transfer object containing email details
   * @returns A promise that resolves when the email is sent
   */
  async sendOrganizationRejectedAsync(sendRejectedMailDto: SendOrgRejectedMailDto): Promise<void> {
    const {
      to,
      organizationName,
      ownerName,
      rejectedAt,
      reason,
    } = sendRejectedMailDto;
    const subject = 'CertChain - Organization Rejected';
    const body = OrganizationRejectedEmail({
      organizationName,
      ownerName,
      rejectedAt,
      reason
    });

    return this.mailService.sendReactMail({
      to,
      subject,
      body,
    }).catch((error) => {
      throw new Error(`Error sending organization rejected email: ${error.message}`);
    });
  }
}
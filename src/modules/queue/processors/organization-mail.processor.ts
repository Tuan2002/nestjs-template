import { OrganizationMailService } from "@/modules/mail/services";
import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";
import { OrganizationMailJobs, QueueNames } from "../enums";
import { SendOrgApprovedJob, SendOrgRegisteredJob, SendOrgRejectedJob } from "../interfaces";

@Processor(QueueNames.ORGANIZATION_MAILS)
export class OrganizationMailProcessor extends WorkerHost {
  private readonly logger = new Logger(OrganizationMailProcessor.name);

  constructor(
    private readonly organizationMailService: OrganizationMailService
  ) {
    super();
  }

  async process(job: Job): Promise<void> {
    switch (job.name) {
      case OrganizationMailJobs.SEND_REGISTERED_EMAIL:
        return this.handleSendRegisteredEmailQueue(job.data);

      case OrganizationMailJobs.SEND_APPROVED_EMAIL:
        return this.handleSendApprovedEmailQueue(job.data);
        
      case OrganizationMailJobs.SEND_REJECTED_EMAIL:
        return this.handleSendRejectedEmailQueue(job.data);
    }
  }

  private async handleSendRegisteredEmailQueue(
    data: SendOrgRegisteredJob
  ): Promise<void> {
    this.logger.log(`Processing email for registered organization: ${data.to}`);
    await this.organizationMailService.sendOrganizationRegisteredAsync({
      to: data.to,
      organizationName: data.organizationName,
      ownerName: data.ownerName,
    });
    this.logger.log(`Processed email for registered organization: ${data.to}`);
  }

  private async handleSendApprovedEmailQueue(
    data: SendOrgApprovedJob
  ): Promise<void> {
    this.logger.log(`Processing email for approved organization: ${data.to}`);
    await this.organizationMailService.sendOrganizationApprovedAsync({
      to: data.to,
      organizationName: data.organizationName,
      ownerName: data.ownerName,
      approvedAt: data.approvedAt,
      account: data.account,
      password: data.password,
    });
    this.logger.log(`Processed email for approved organization: ${data.to}`);
  }

  private async handleSendRejectedEmailQueue(
    data: SendOrgRejectedJob
  ): Promise<void> {
    this.logger.log(`Processing email for rejected organization: ${data.to}`);
    await this.organizationMailService.sendOrganizationRejectedAsync({
      to: data.to,
      organizationName: data.organizationName,
      ownerName: data.ownerName,
      rejectedAt: data.rejectedAt,
      reason: data.reason,
    });
    this.logger.log(`Processed email for rejected organization: ${data.to}`);
  }
}
import { InjectQueue } from "@nestjs/bullmq";
import { Injectable, Logger } from "@nestjs/common";
import { Queue } from "bullmq";
import { DEFAULT_JOB_OPTIONS } from "../configs";
import { OrganizationMailJobs, QueueNames } from "../enums";
import { SendOrgApprovedJob, SendOrgRegisteredJob, SendOrgRejectedJob } from "../interfaces";

@Injectable()
export class OrganizationMailQueueService {
  private readonly logger = new Logger(OrganizationMailQueueService.name);

  constructor(
    @InjectQueue(QueueNames.ORGANIZATION_MAILS)
    private readonly organizationMailQueue: Queue,
  ) { }

  /**
  * Add a job to send organization registered email to the queue
  * @param data - Data for the sell requested event job
  * @returns a Promise that resolves when the job is added
  */
  async addSendOrganizationRegisteredEmailJob(
    data: SendOrgRegisteredJob
  ): Promise<void> {
    await this.organizationMailQueue.add(OrganizationMailJobs.SEND_REGISTERED_EMAIL, data, {
      ...DEFAULT_JOB_OPTIONS,
    });
    this.logger.log(
      `Added job to send organization registered email to queue for: ${data.to}`
    );
  }

  /**
   * Add a job to send organization approved email to the queue
   * @param data - Data for the sell requested event job
   * @returns a Promise that resolves when the job is added
   */
  async addSendOrganizationApprovedEmailJob(
    data: SendOrgApprovedJob
  ): Promise<void> {
    await this.organizationMailQueue.add(OrganizationMailJobs.SEND_APPROVED_EMAIL, data, {
      ...DEFAULT_JOB_OPTIONS,
    });
    this.logger.log(
      `Added job to send organization approved email to queue for: ${data.to}`
    );
  }

  /**
   * Add a job to send organization rejected email to the queue
   * @param data - Data for the sell requested event job
   * @returns a Promise that resolves when the job is added
   */
  async addSendOrganizationRejectedEmailJob(
    data: SendOrgRejectedJob
  ): Promise<void> {
    await this.organizationMailQueue.add(OrganizationMailJobs.SEND_REJECTED_EMAIL, data, {
      ...DEFAULT_JOB_OPTIONS,
    });
    this.logger.log(
      `Added job to send organization rejected email to queue for: ${data.to}`
    );
  }
}
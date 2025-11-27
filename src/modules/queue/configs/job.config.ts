import { JobsOptions } from 'bullmq';

/**
 * @file Job configuration options for BullMQ
 * This file defines the default job options used across the application.
 * It includes retry attempts, backoff strategy, and job removal policies.
 * @see https://docs.bullmq.io/guide/jobs#job-options
 */
export const DEFAULT_JOB_OPTIONS: JobsOptions = {
  // Attempts to retry the job if it fails
  attempts: 5,
  backoff: {
    type: 'exponential',
    delay: 5000,
  },
  removeOnComplete: {
    // Keep completed jobs for 6 hours
    // This is useful for debugging and auditing purposes
    // The webhook and ETH RPC events need for avoid duplicate processing
    //! DO NOT SET TO true or 0, can be set to false or greater than 10 minutes
    age: 6 * 60 * 60,
  },
  removeOnFail: 50,
};
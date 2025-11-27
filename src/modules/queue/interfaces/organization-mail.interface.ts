export interface SendOrgRegisteredJob {
  to: string;
  ownerName: string;
  organizationName: string;
}

export interface SendOrgApprovedJob {
  to: string;
  ownerName: string;
  organizationName: string;
  approvedAt: Date;
  account: string;
  password: string;
}

export interface SendOrgRejectedJob {
  to: string;
  ownerName: string;
  organizationName: string;
  rejectedAt: Date;
  reason: string;
}
export interface AuthorizedContext {
  jti: string;
  userId: string;
  walletAddress?: string;
  email?: string;
  userName: string;
  role: string;
  avatar?: string;
}

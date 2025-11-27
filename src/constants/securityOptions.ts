export const SecurityOptions = {
  JWT_EXPIRATION_TIME: 7 * 24 * 60 * 60, // 7 days in seconds
  PASSWORD_SALT_ROUNDS: 10,
  ATTEMPT_FAILURE_LIMIT: 5,
  LOGIN_LOCKOUT_LIMIT: 20,
  FILE_SIGN_TIME: 60, // 1 minute
  LOCKOUT_DURATION: 5 * 60, // 5 minutes
  OTP_EXPIRATION_TIME: 5 * 60, // 5 minutes
  DEFAULT_PASSWORD: 'NEST@2025',
};

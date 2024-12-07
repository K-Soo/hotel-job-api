export const customHttpException = {
  ACCESS_TOKEN_EXPIRED: {
    customCode: 1000,
    message: 'Access token expired',
  },
  ACCESS_TOKEN_INVALID_CREDENTIALS: {
    customCode: 1010,
    message: 'Access token is invalid',
  },
  REFRESH_TOKEN_EXPIRED: {
    customCode: 1020,
    message: 'Refresh token expired',
  },
  REFRESH_TOKEN_INVALID_CREDENTIALS: {
    customCode: 1030,
    message: 'Access token is invalid',
  },
  OAUTH_TOKEN_ERROR: {
    customCode: 2000,
    message: 'The access token is invalid, expired, or lacks the required permissions.',
  },
  OAUTH_USER_INFO_ERROR: {
    code: 2010,
    message: 'Failed to fetch user information from Kakao.',
  },
} as const;

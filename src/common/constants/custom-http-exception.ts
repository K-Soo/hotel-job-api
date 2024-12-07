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
  REFRESH_TOKEN_MISSING: {
    customCode: 1030,
    message: 'Refresh token is missing',
  },
  REFRESH_TOKEN_INVALID_CREDENTIALS: {
    customCode: 1040,
    message: 'Refresh token is invalid',
  },
  OAUTH_TOKEN_ERROR: {
    customCode: 2000,
    message: 'Authentication failed',
  },
  OAUTH_USER_INFO_ERROR: {
    code: 2010,
    message: 'Authentication failed.',
  },
} as const;

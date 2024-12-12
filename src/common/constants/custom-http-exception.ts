export const customHttpException = {
  ACCESS_TOKEN_EXPIRED: {
    customCode: 1000,
    message: 'Access token expired',
  },
  ACCESS_TOKEN_MISSING: {
    customCode: 1001,
    message: 'Access token is missing',
  },
  ACCESS_TOKEN_INVALID_CREDENTIALS: {
    customCode: 1002,
    message: 'Access token is invalid',
  },
  REFRESH_TOKEN_EXPIRED: {
    customCode: 1020,
    message: 'Refresh token expired',
  },
  REFRESH_TOKEN_MISSING: {
    customCode: 1021,
    message: 'Refresh token is missing',
  },
  REFRESH_TOKEN_INVALID_CREDENTIALS: {
    customCode: 1022,
    message: 'Refresh token is invalid credentials',
  },
  OAUTH_SIGN_IN_TOKEN: {
    customCode: 2000,
    message: 'Authentication failed',
  },
  OAUTH_SIGN_IN_USER_INFO: {
    customCode: 2001,
    message: 'Authentication failed.',
  },
  OAUTH_SIGN_IN_NOT_FOUND_USER: {
    customCode: 2002,
    message: 'User not found',
  },
  OAUTH_SIGN_IN_BAD_REQUEST: {
    customCode: 2003,
    message: 'Required field missing in the request body',
  },
} as const;

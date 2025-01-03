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
    message: 'Access denied',
  },
  REFRESH_TOKEN_INVALID_CREDENTIALS: {
    customCode: 1022,
    message: 'Refresh token is invalid credentials',
  },

  NOT_FOUND_USER: {
    customCode: 1030,
    message: 'Not found User.',
  },

  USER_ROLE_INVALID: {
    customCode: 1040,
    message: 'Permission denied',
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
  CREATION_LIMIT_EXCEEDED: {
    customCode: 3000,
    message: 'Creation limit exceeded for the resource',
  },
  //데이터베이스
  DATABASE_OPERATION_FAILED: {
    customCode: 6000,
    message: 'An error occurred while processing your request',
  },
  //파일
  IMAGE_UPLOAD_FAILED: {
    customCode: 7000,
    message: 'Failed to process the file. Please try again.',
  },
  IMAGE_DELETE_FAILED: {
    customCode: 7001,
    message: 'Failed to process the file. Please try again.',
  },
  IMAGE_FORMAT_NOT_SUPPORTED: {
    customCode: 7002,
    message: 'Failed to process the file. Please try again.',
  },
  IMAGE_SIZE_EXCEEDED: {
    customCode: 7003,
    message: 'Failed to process the file. Please try again.',
  },
} as const;

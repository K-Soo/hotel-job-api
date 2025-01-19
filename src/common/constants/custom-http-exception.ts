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

  OAUTH_GET_TOKEN_ERROR: {
    customCode: 2000,
    message: 'oauth get access token failed',
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
  OAUTH_GET_USER_INFO_ERROR: {
    customCode: 2004,
    message: 'oauth get user-info failed',
  },
  CREATION_LIMIT_EXCEEDED: {
    customCode: 3000,
    message: 'Creation limit exceeded for the resource',
  },
  CERTIFICATION_BAD_REQUEST: {
    customCode: 3010,
    message: 'Required field missing in the request body',
  },
  CERTIFICATION_FAILED: (message: string) => ({
    customCode: 3011,
    message: message,
  }),
  NOT_MODIFIED: {
    customCode: 4000,
    message: 'Not modified',
  },
  BAD_REQUEST_REMOVE: (message: string) => ({
    customCode: 4001,
    message: message,
  }),
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
  ACCOUNT_STATUS_INACTIVE: {
    customCode: 8000,
    message: 'Your account is inactive.',
  },
  ACCOUNT_STATUS_BLOCKED: {
    customCode: 8001,
    message: 'Your account is blocked.',
  },
  ACCOUNT_STATUS_SUSPENDED: {
    customCode: 8002,
    message: 'Your account is suspended.',
  },
  ACCOUNT_STATUS_LOCKED: {
    customCode: 8003,
    message: 'Your account is locked.',
  },
  ACCOUNT_STATUS_DEACTIVATED: {
    customCode: 8004,
    message: 'Your account is deactivated.',
  },
  ACCOUNT_STATUS_PENDING: {
    customCode: 8005,
    message: 'Your account is pending verification.',
  },
  ACCOUNT_STATUS_RECOVERY: {
    customCode: 8006,
    message: 'Your account is under recovery.',
  },
  ACCOUNT_STATUS_ANONYMIZED: {
    customCode: 8007,
    message: 'Your account is anonymized.',
  },
  ACCOUNT_STATUS_WAITING_APPROVAL: {
    customCode: 8008,
    message: 'Your account is awaiting approval.',
  },
} as const;

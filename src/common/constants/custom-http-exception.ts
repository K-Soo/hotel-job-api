export const customHttpException = {
  ACCESS_TOKEN_EXPIRED: {
    customCode: 1000,
    message: 'Access token expired',
  },
  INVALID_CREDENTIALS: {
    customCode: 1010,
    message: 'Refresh token expired',
  },
  RESOURCE_NOT_FOUND: {
    customCode: 1020,
    message: 'The requested resource was not found.',
  },
} as const;

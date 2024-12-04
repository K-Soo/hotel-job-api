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
  DATABASE_QUERY_FAILED: {
    customCode: 6000,
    message: 'An error occurred while executing a database query.',
  },
  DATABASE_INTEGRITY_VIOLATION: {
    customCode: 6010,
    message: 'Data integrity violation in the database.',
  },
  DATABASE_CONNECTION_FAILED: {
    customCode: 6020,
    message: 'Failed to connect to the database.',
  },
};

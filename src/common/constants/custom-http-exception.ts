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
  // 소셜 로그인 인증
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
  OAUTH_SIGN_IN_TOKEN_RATE_LIMIT: {
    customCode: 2005,
    message: 'token request rate limit exceeded',
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
  CERTIFICATION_UNAUTHORIZED: {
    customCode: 3012,
    message: 'User is not certified',
  },
  NOT_MODIFIED: {
    customCode: 4000,
    message: 'Not modified',
  },
  BAD_REQUEST_REMOVE: (message: string) => ({
    customCode: 4001,
    message: message,
  }),
  // 결제
  PAYMENT_NOT_FOUND_PRODUCT: {
    customCode: 4010,
    message: 'Not found Product.',
  },
  PAYMENT_NOT_FOUND_EMPLOYER: {
    customCode: 4011,
    message: 'Not found Employer.',
  },
  PAYMENT_NOT_FOUND_ORDER: {
    customCode: 4012,
    message: 'Not found order info.',
  },
  PAYMENT_EXPIRED_ORDER: {
    customCode: 4013,
    message: 'Expired order info.',
  },
  PAYMENT_INVALID_STATUS: {
    customCode: 4014,
    message: 'Invalid order status.',
  },
  PAYMENT_INVALID_TOTAL_AMOUNT: {
    customCode: 4015,
    message: 'Invalid total amount. Please contact customer support.',
  },
  PAYMENT_EMPTY_ORDER_ITEMS: {
    customCode: 4016,
    message: 'No items found in the order. Please contact customer support.',
  },
  PAYMENT_NOT_FOUND_RECRUITMENT: {
    customCode: 4017,
    message: 'Not found Recruitment.',
  },
  PAYMENT_NO_EXIST_RECRUITMENT: {
    customCode: 4018,
    message: 'No exist Recruitment.',
  },
  PAYMENT_NOT_PUBLISHED_RECRUITMENT: {
    customCode: 4019,
    message: 'Not published Recruitment.',
  },
  PAYMENT_NOT_CERT_USER: {
    customCode: 4020,
    message: 'Not certificated user.',
  },
  PAYMENT_CLOSED_STATUS: {
    customCode: 4025,
    message: 'closed order status.',
  },
  PAYMENT_COMPLETED_STATUS: {
    customCode: 4026,
    message: 'completed order status.',
  },
  // TOSS
  PAYMENT_AMOUNT_TAMPERING_DETECTED: {
    customCode: 4021,
    message: 'Payment amount has been tampered with. The payment has been declined.',
  },
  PAYMENT_ORDER_TAMPERING_DETECTED: {
    customCode: 4022,
    message: 'Payment order has been tampered with. The payment has been declined.',
  },
  PAYMENT_ORDER_ALREADY_PROCESSED: {
    customCode: 4023,
    message: 'Payment order has already been processed.',
  },
  PAYMENT_CONFIRM_FAILED: {
    customCode: 4024,
    message: 'Payment confirmation failed.',
  },
  //  쿠폰
  COUPON_NOT_FOUND: {
    customCode: 4050,
    message: 'Not found coupon.',
  },
  COUPON_ALREADY_USED: {
    customCode: 4051,
    message: 'Coupon Already Used.',
  },
  COUPON_ALREADY_APPLIED: {
    customCode: 4052,
    message: 'Coupon Already Applied.',
  },
  COUPON_EXPIRES: {
    customCode: 4052,
    message: 'Coupon Expires.',
  },
  COUPON_NOT_APPLIED: {
    customCode: 4053,
    message: 'Coupon Not Applied.',
  },
  COUPON_ISSUE_FAILED: {
    customCode: 4054,
    message: 'Coupon Issuance Failed.',
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
  IMAGE_METADATA_FETCH_FAILED: {
    customCode: 7004,
    message: 'Failed to process the file. Please try again.',
  },
  // 계정 상태
  ACCOUNT_STATUS_INACTIVE: {
    customCode: 8000,
    message: 'This account is currently inactive.',
  },
  ACCOUNT_STATUS_BLOCKED: {
    customCode: 8001,
    message: 'Access to this account has been permanently restricted.',
  },
  ACCOUNT_STATUS_SUSPENDED: {
    customCode: 8002,
    message: 'This account has been temporarily suspended.',
  },
  ACCOUNT_STATUS_LOCKED: {
    customCode: 8003,
    message: 'This account has been locked for security reasons.',
  },
  ACCOUNT_STATUS_DEACTIVATED: {
    customCode: 8004,
    message: 'This account has been deactivated.',
  },
  ACCOUNT_STATUS_PENDING: {
    customCode: 8005,
    message: 'This account is pending verification.',
  },
  ACCOUNT_STATUS_RECOVERY: {
    customCode: 8006,
    message: 'This account is under recovery process.',
  },
  ACCOUNT_STATUS_ANONYMIZED: {
    customCode: 8007,
    message: 'This account’s personal information has been anonymized.',
  },
  ACCOUNT_STATUS_WAITING_APPROVAL: {
    customCode: 8008,
    message: 'This account is waiting for administrator approval.',
  },
  ACCOUNT_STATUS_WITHDRAW: {
    customCode: 8009,
    message: 'This account has been withdrawn by the user.',
  },
} as const;

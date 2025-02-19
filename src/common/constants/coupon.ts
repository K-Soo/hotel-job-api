export enum DiscountType {
  FIXED = 'FIXED', // 정액 할인 (ex = 5,000원 할인)
  PERCENTAGE = 'PERCENTAGE', // 퍼센트 할인 (ex: 10% 할인)
}

export enum MONTHLY_COUPON_CODE {
  FAMILY = 'FAMILY_1000',
  BRONZE = 'BRONZE_1000',
  SILVER = 'SILVER_2000',
  GOLD = 'GOLD_3000',
  VIP = 'VIP_4000',
}

// export enum WELCOME_BASIC_10_DAYS = 'WELCOME_BASIC_10_DAYS';

export enum COUPON_CODE_LIST {
  WELCOME_BASIC_10_DAYS = 'WELCOME_BASIC_10_DAYS',
  FAMILY_1000 = 'FAMILY_1000',
  BRONZE_1000 = 'BRONZE_1000',
  SILVER_2000 = 'SILVER_2000',
  GOLD_3000 = 'GOLD_3000',
  VIP_4000 = 'VIP_4000',
}

export const COUPON_DESCRIPTION = {
  WELCOME_BASIC_10_DAYS: '웰컴 쿠폰: 기본 공고 10일 무료! 추가 공고는 최대 11,000원 할인',
};

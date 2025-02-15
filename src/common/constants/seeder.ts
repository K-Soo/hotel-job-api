import { MembershipLevel } from '../../common/constants/membership';
import { COUPON_CODE_LIST, DiscountType } from '../../common/constants/coupon';

const MAX_SCORE = 10000000000;

export const MEMBERSHIP_SEEDER = [
  { membershipLevel: MembershipLevel.FAMILY, discountRate: 0, minScore: 0, maxScore: 100_000 }, // ~10만 원
  { membershipLevel: MembershipLevel.BRONZE, discountRate: 0.02, minScore: 100_001, maxScore: 300_000 }, // 10만 ~ 30만 원
  { membershipLevel: MembershipLevel.SILVER, discountRate: 0.03, minScore: 300_001, maxScore: 600_000 }, // 30만 ~ 60만 원
  { membershipLevel: MembershipLevel.GOLD, discountRate: 0.04, minScore: 600_001, maxScore: 1_000_000 }, // 60만 ~ 100만 원
  { membershipLevel: MembershipLevel.VIP, discountRate: 0.06, minScore: 1_000_001, maxScore: MAX_SCORE }, // 100만 원 초과
];

export const COUPON_SEEDER = [
  // WELCOME
  {
    code: COUPON_CODE_LIST.WELCOME_BASIC_10_DAYS,
    discountType: DiscountType.FIXED,
    discountRate: 0,
    discountAmount: 11000,
    minOrderAmount: 0,
    maxDiscountAmount: 11000,
    isSingleUse: true,
    isPublic: false,
  },
  // FAMILY
  {
    code: COUPON_CODE_LIST.FAMILY_1000,
    discountType: DiscountType.FIXED,
    discountRate: 0,
    discountAmount: 1000,
    minOrderAmount: 20_000,
    maxDiscountAmount: 0,
    isSingleUse: true,
    isPublic: false,
  },
  //BRONZE
  {
    code: COUPON_CODE_LIST.BRONZE_1000,
    discountType: DiscountType.FIXED,
    discountRate: 0,
    discountAmount: 1000,
    minOrderAmount: 20_000,
    maxDiscountAmount: 0,
    isSingleUse: true,
    isPublic: false,
  },
  //SILVER
  {
    code: COUPON_CODE_LIST.SILVER_2000,
    discountType: DiscountType.FIXED,
    discountRate: 0,
    discountAmount: 2000,
    minOrderAmount: 20_000,
    maxDiscountAmount: 0,
    isSingleUse: true,
    isPublic: false,
  },
  //GOLD
  {
    code: COUPON_CODE_LIST.GOLD_3000,
    discountType: DiscountType.FIXED,
    discountRate: 0,
    discountAmount: 3000,
    minOrderAmount: 20_000,
    maxDiscountAmount: 0,
    isSingleUse: true,
    isPublic: false,
  },
  //VIP
  {
    code: COUPON_CODE_LIST.VIP_4000,
    discountType: DiscountType.FIXED,
    discountRate: 0,
    discountAmount: 4000,
    minOrderAmount: 20_000,
    maxDiscountAmount: 0,
    isSingleUse: true,
    isPublic: false,
  },
];

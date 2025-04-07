import { MembershipLevel } from '../../common/constants/membership';
import { COUPON_CODE_LIST, DiscountType } from '../../common/constants/coupon';
import {
  RecruitmentDuration,
  RecruitmentOptionTag,
  RecruitmentProductName,
  RecruitmentProductOptionName,
  RecruitmentProductType,
} from './product';

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

// 메인 페이지 상품
export const MAIN_PRODUCT_SEEDER = [
  {
    type: RecruitmentProductType.MAIN,
    name: RecruitmentProductName.PREMIUM,
    durations: [
      { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 168000, bonusDays: 4, discountRate: 0.2 },
      { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 112000, bonusDays: 3, discountRate: 0.15 },
      { duration: RecruitmentDuration.TEN_DAYS, price: 80000, bonusDays: 2, discountRate: 0.12 },
      { duration: RecruitmentDuration.SEVEN_DAYS, price: 56000, bonusDays: 1, discountRate: 0.1 },
      { duration: RecruitmentDuration.FIVE_DAYS, price: 40000, discountRate: 0 },
      { duration: RecruitmentDuration.THREE_DAYS, price: 24000, discountRate: 0 },
    ],
    options: [
      {
        name: RecruitmentProductOptionName.LIST_UP,
        maxListUpPerDay: 4,
        listUpIntervalHours: 6,
        tags: [],
        optionDurations: [
          { duration: RecruitmentDuration.THREE_DAYS, price: 14700, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.FIVE_DAYS, price: 24500, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.SEVEN_DAYS, price: 34300, discountRate: 0.1, bonusDays: 1 },
          { duration: RecruitmentDuration.TEN_DAYS, price: 49000, discountRate: 0.1, bonusDays: 2 },
          { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 68600, discountRate: 0.1, bonusDays: 3 },
          { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 102900, discountRate: 0.1, bonusDays: 4 },
        ],
      },
      {
        name: RecruitmentProductOptionName.TAG,
        maxListUpPerDay: 0,
        listUpIntervalHours: 0,
        tags: [RecruitmentOptionTag.NEW, RecruitmentOptionTag.POPULAR, RecruitmentOptionTag.RECOMMENDED],
        optionDurations: [
          { duration: RecruitmentDuration.THREE_DAYS, price: 5700, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.FIVE_DAYS, price: 9500, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.SEVEN_DAYS, price: 13300, discountRate: 0.1, bonusDays: 1 },
          { duration: RecruitmentDuration.TEN_DAYS, price: 19000, discountRate: 0.1, bonusDays: 2 },
          { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 26600, discountRate: 0.1, bonusDays: 3 },
          { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 39900, discountRate: 0.1, bonusDays: 4 },
        ],
      },
      {
        name: RecruitmentProductOptionName.HIGHLIGHT,
        tags: [],
        optionDurations: [
          { duration: RecruitmentDuration.THREE_DAYS, price: 5700, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.FIVE_DAYS, price: 9500, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.SEVEN_DAYS, price: 13300, discountRate: 0.1, bonusDays: 1 },
          { duration: RecruitmentDuration.TEN_DAYS, price: 19000, discountRate: 0.1, bonusDays: 2 },
          { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 26600, discountRate: 0.1, bonusDays: 3 },
          { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 39900, discountRate: 0.1, bonusDays: 4 },
        ],
      },
      {
        name: RecruitmentProductOptionName.BOLD,
        tags: [],
        optionDurations: [
          { duration: RecruitmentDuration.THREE_DAYS, price: 5700, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.FIVE_DAYS, price: 9500, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.SEVEN_DAYS, price: 13300, discountRate: 0.1, bonusDays: 1 },
          { duration: RecruitmentDuration.TEN_DAYS, price: 19000, discountRate: 0.1, bonusDays: 2 },
          { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 26600, discountRate: 0.1, bonusDays: 3 },
          { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 39900, discountRate: 0.1, bonusDays: 4 },
        ],
      },
    ],
  },
  {
    type: RecruitmentProductType.MAIN,
    name: RecruitmentProductName.SPECIAL,
    durations: [
      { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 126000, bonusDays: 4, discountRate: 0.2 },
      { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 84000, bonusDays: 3, discountRate: 0.15 },
      { duration: RecruitmentDuration.TEN_DAYS, price: 60000, bonusDays: 2, discountRate: 0.12 },
      { duration: RecruitmentDuration.SEVEN_DAYS, price: 42000, bonusDays: 1, discountRate: 0.1 },
      { duration: RecruitmentDuration.FIVE_DAYS, price: 30000, discountRate: 0 },
      { duration: RecruitmentDuration.THREE_DAYS, price: 18000, discountRate: 0 },
    ],
    options: [
      {
        name: RecruitmentProductOptionName.LIST_UP,
        maxListUpPerDay: 4,
        listUpIntervalHours: 6,
        tags: [],
        optionDurations: [
          { duration: RecruitmentDuration.THREE_DAYS, price: 14700, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.FIVE_DAYS, price: 24500, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.SEVEN_DAYS, price: 34300, discountRate: 0.1, bonusDays: 1 },
          { duration: RecruitmentDuration.TEN_DAYS, price: 49000, discountRate: 0.1, bonusDays: 2 },
          { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 68600, discountRate: 0.1, bonusDays: 3 },
          { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 102900, discountRate: 0.1, bonusDays: 4 },
        ],
      },
      {
        name: RecruitmentProductOptionName.TAG,
        tags: [RecruitmentOptionTag.NEW, RecruitmentOptionTag.POPULAR, RecruitmentOptionTag.RECOMMENDED],
        optionDurations: [
          { duration: RecruitmentDuration.THREE_DAYS, price: 5700, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.FIVE_DAYS, price: 9500, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.SEVEN_DAYS, price: 13300, discountRate: 0.1, bonusDays: 1 },
          { duration: RecruitmentDuration.TEN_DAYS, price: 19000, discountRate: 0.1, bonusDays: 2 },
          { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 26600, discountRate: 0.1, bonusDays: 3 },
          { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 39900, discountRate: 0.1, bonusDays: 4 },
        ],
      },
      {
        name: RecruitmentProductOptionName.HIGHLIGHT,
        tags: [],
        optionDurations: [
          { duration: RecruitmentDuration.THREE_DAYS, price: 5700, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.FIVE_DAYS, price: 9500, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.SEVEN_DAYS, price: 13300, discountRate: 0.1, bonusDays: 1 },
          { duration: RecruitmentDuration.TEN_DAYS, price: 19000, discountRate: 0.1, bonusDays: 2 },
          { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 26600, discountRate: 0.1, bonusDays: 3 },
          { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 39900, discountRate: 0.1, bonusDays: 4 },
        ],
      },
      {
        name: RecruitmentProductOptionName.BOLD,
        tags: [],
        optionDurations: [
          { duration: RecruitmentDuration.THREE_DAYS, price: 5700, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.FIVE_DAYS, price: 9500, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.SEVEN_DAYS, price: 13300, discountRate: 0.1, bonusDays: 1 },
          { duration: RecruitmentDuration.TEN_DAYS, price: 19000, discountRate: 0.1, bonusDays: 2 },
          { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 26600, discountRate: 0.1, bonusDays: 3 },
          { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 39900, discountRate: 0.1, bonusDays: 4 },
        ],
      },
    ],
  },
];

// 채용 페이지 상품
export const RECRUIT_PRODUCT_SEEDER = [
  {
    type: RecruitmentProductType.RECRUIT,
    name: RecruitmentProductName.PREMIUM,
    durations: [
      { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 168000, bonusDays: 4, discountRate: 0.2 },
      { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 112000, bonusDays: 3, discountRate: 0.15 },
      { duration: RecruitmentDuration.TEN_DAYS, price: 80000, bonusDays: 2, discountRate: 0.12 },
      { duration: RecruitmentDuration.SEVEN_DAYS, price: 56000, bonusDays: 1, discountRate: 0.1 },
      { duration: RecruitmentDuration.FIVE_DAYS, price: 40000, discountRate: 0 },
      { duration: RecruitmentDuration.THREE_DAYS, price: 24000, discountRate: 0 },
    ],
    options: [
      {
        name: RecruitmentProductOptionName.LIST_UP,
        maxListUpPerDay: 4,
        listUpIntervalHours: 6,
        tags: [],
        optionDurations: [
          { duration: RecruitmentDuration.THREE_DAYS, price: 14700, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.FIVE_DAYS, price: 24500, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.SEVEN_DAYS, price: 34300, discountRate: 0.1, bonusDays: 1 },
          { duration: RecruitmentDuration.TEN_DAYS, price: 49000, discountRate: 0.1, bonusDays: 2 },
          { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 68600, discountRate: 0.1, bonusDays: 3 },
          { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 102900, discountRate: 0.1, bonusDays: 4 },
        ],
      },
      {
        name: RecruitmentProductOptionName.TAG,
        maxListUpPerDay: 0,
        listUpIntervalHours: 0,
        tags: [RecruitmentOptionTag.NEW, RecruitmentOptionTag.POPULAR, RecruitmentOptionTag.RECOMMENDED],
        optionDurations: [
          { duration: RecruitmentDuration.THREE_DAYS, price: 5700, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.FIVE_DAYS, price: 9500, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.SEVEN_DAYS, price: 13300, discountRate: 0.1, bonusDays: 1 },
          { duration: RecruitmentDuration.TEN_DAYS, price: 19000, discountRate: 0.1, bonusDays: 2 },
          { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 26600, discountRate: 0.1, bonusDays: 3 },
          { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 39900, discountRate: 0.1, bonusDays: 4 },
        ],
      },
      {
        name: RecruitmentProductOptionName.HIGHLIGHT,
        tags: [],
        optionDurations: [
          { duration: RecruitmentDuration.THREE_DAYS, price: 5700, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.FIVE_DAYS, price: 9500, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.SEVEN_DAYS, price: 13300, discountRate: 0.1, bonusDays: 1 },
          { duration: RecruitmentDuration.TEN_DAYS, price: 19000, discountRate: 0.1, bonusDays: 2 },
          { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 26600, discountRate: 0.1, bonusDays: 3 },
          { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 39900, discountRate: 0.1, bonusDays: 4 },
        ],
      },
      {
        name: RecruitmentProductOptionName.BOLD,
        tags: [],
        optionDurations: [
          { duration: RecruitmentDuration.THREE_DAYS, price: 5700, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.FIVE_DAYS, price: 9500, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.SEVEN_DAYS, price: 13300, discountRate: 0.1, bonusDays: 1 },
          { duration: RecruitmentDuration.TEN_DAYS, price: 19000, discountRate: 0.1, bonusDays: 2 },
          { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 26600, discountRate: 0.1, bonusDays: 3 },
          { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 39900, discountRate: 0.1, bonusDays: 4 },
        ],
      },
    ],
  },
  // 1일 4900
  {
    type: RecruitmentProductType.RECRUIT,
    name: RecruitmentProductName.SPECIAL,
    durations: [
      { duration: RecruitmentDuration.TWENTY_ONE_DAYS, bonusDays: 4, price: 102900, discountRate: 0.2 }, // 92,610원 적용
      { duration: RecruitmentDuration.FOURTEEN_DAYS, bonusDays: 3, price: 68600, discountRate: 0.15 }, // 61,740원 적용
      { duration: RecruitmentDuration.TEN_DAYS, bonusDays: 2, price: 49000, discountRate: 0.12 }, // 43,120원 적용
      { duration: RecruitmentDuration.SEVEN_DAYS, bonusDays: 1, price: 34300, discountRate: 0.1 }, // 30,870원 적용
      { duration: RecruitmentDuration.FIVE_DAYS, price: 24500, discountRate: 0 },
      { duration: RecruitmentDuration.THREE_DAYS, price: 14700, discountRate: 0 },
    ],
    options: [
      {
        name: RecruitmentProductOptionName.LIST_UP,
        maxListUpPerDay: 4,
        listUpIntervalHours: 6,
        tags: [],
        optionDurations: [
          { duration: RecruitmentDuration.THREE_DAYS, price: 14700, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.FIVE_DAYS, price: 24500, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.SEVEN_DAYS, price: 34300, discountRate: 0.1, bonusDays: 1 },
          { duration: RecruitmentDuration.TEN_DAYS, price: 49000, discountRate: 0.1, bonusDays: 2 },
          { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 68600, discountRate: 0.1, bonusDays: 3 },
          { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 102900, discountRate: 0.1, bonusDays: 4 },
        ],
      },
      {
        name: RecruitmentProductOptionName.TAG,
        tags: [RecruitmentOptionTag.NEW, RecruitmentOptionTag.POPULAR, RecruitmentOptionTag.RECOMMENDED],
        optionDurations: [
          { duration: RecruitmentDuration.THREE_DAYS, price: 5700, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.FIVE_DAYS, price: 9500, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.SEVEN_DAYS, price: 13300, discountRate: 0.1, bonusDays: 1 },
          { duration: RecruitmentDuration.TEN_DAYS, price: 19000, discountRate: 0.1, bonusDays: 2 },
          { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 26600, discountRate: 0.1, bonusDays: 3 },
          { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 39900, discountRate: 0.1, bonusDays: 4 },
        ],
      },
      {
        name: RecruitmentProductOptionName.HIGHLIGHT,
        tags: [],
        optionDurations: [
          { duration: RecruitmentDuration.THREE_DAYS, price: 5700, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.FIVE_DAYS, price: 9500, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.SEVEN_DAYS, price: 13300, discountRate: 0.1, bonusDays: 1 },
          { duration: RecruitmentDuration.TEN_DAYS, price: 19000, discountRate: 0.1, bonusDays: 2 },
          { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 26600, discountRate: 0.1, bonusDays: 3 },
          { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 39900, discountRate: 0.1, bonusDays: 4 },
        ],
      },
      {
        name: RecruitmentProductOptionName.BOLD,
        tags: [],
        optionDurations: [
          { duration: RecruitmentDuration.THREE_DAYS, price: 5700, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.FIVE_DAYS, price: 9500, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.SEVEN_DAYS, price: 13300, discountRate: 0.1, bonusDays: 1 },
          { duration: RecruitmentDuration.TEN_DAYS, price: 19000, discountRate: 0.1, bonusDays: 2 },
          { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 26600, discountRate: 0.1, bonusDays: 3 },
          { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 39900, discountRate: 0.1, bonusDays: 4 },
        ],
      },
    ],
  },
  // 1일 3900
  {
    type: RecruitmentProductType.RECRUIT,
    name: RecruitmentProductName.URGENT,
    durations: [
      { duration: RecruitmentDuration.TWENTY_ONE_DAYS, bonusDays: 4, price: 81900, discountRate: 0.2 }, // 73,710원 적용
      { duration: RecruitmentDuration.FOURTEEN_DAYS, bonusDays: 3, price: 54600, discountRate: 0.15 }, // 49,140원 적용
      { duration: RecruitmentDuration.TEN_DAYS, bonusDays: 2, price: 39000, discountRate: 0.12 }, // 34,320원 적용
      { duration: RecruitmentDuration.SEVEN_DAYS, bonusDays: 1, price: 27300, discountRate: 0.1 }, // 24,570원 적용
      { duration: RecruitmentDuration.FIVE_DAYS, price: 19500, discountRate: 0 },
      { duration: RecruitmentDuration.THREE_DAYS, price: 11700, discountRate: 0 },
    ],
    options: [
      {
        name: RecruitmentProductOptionName.LIST_UP,
        maxListUpPerDay: 4,
        listUpIntervalHours: 6,
        tags: [],
        optionDurations: [
          { duration: RecruitmentDuration.THREE_DAYS, price: 14700, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.FIVE_DAYS, price: 24500, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.SEVEN_DAYS, price: 34300, discountRate: 0.1, bonusDays: 1 },
          { duration: RecruitmentDuration.TEN_DAYS, price: 49000, discountRate: 0.1, bonusDays: 2 },
          { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 68600, discountRate: 0.1, bonusDays: 3 },
          { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 102900, discountRate: 0.1, bonusDays: 4 },
        ],
      },
      {
        name: RecruitmentProductOptionName.TAG,
        tags: [RecruitmentOptionTag.NEW, RecruitmentOptionTag.POPULAR, RecruitmentOptionTag.RECOMMENDED],
        optionDurations: [
          { duration: RecruitmentDuration.THREE_DAYS, price: 5700, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.FIVE_DAYS, price: 9500, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.SEVEN_DAYS, price: 13300, discountRate: 0.1, bonusDays: 1 },
          { duration: RecruitmentDuration.TEN_DAYS, price: 19000, discountRate: 0.1, bonusDays: 2 },
          { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 26600, discountRate: 0.1, bonusDays: 3 },
          { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 39900, discountRate: 0.1, bonusDays: 4 },
        ],
      },
      {
        name: RecruitmentProductOptionName.HIGHLIGHT,
        tags: [],
        optionDurations: [
          { duration: RecruitmentDuration.THREE_DAYS, price: 5700, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.FIVE_DAYS, price: 9500, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.SEVEN_DAYS, price: 13300, discountRate: 0.1, bonusDays: 1 },
          { duration: RecruitmentDuration.TEN_DAYS, price: 19000, discountRate: 0.1, bonusDays: 2 },
          { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 26600, discountRate: 0.1, bonusDays: 3 },
          { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 39900, discountRate: 0.1, bonusDays: 4 },
        ],
      },
      {
        name: RecruitmentProductOptionName.BOLD,
        tags: [],
        optionDurations: [
          { duration: RecruitmentDuration.THREE_DAYS, price: 5700, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.FIVE_DAYS, price: 9500, discountRate: 0.1, bonusDays: 0 },
          { duration: RecruitmentDuration.SEVEN_DAYS, price: 13300, discountRate: 0.1, bonusDays: 1 },
          { duration: RecruitmentDuration.TEN_DAYS, price: 19000, discountRate: 0.1, bonusDays: 2 },
          { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 26600, discountRate: 0.1, bonusDays: 3 },
          { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 39900, discountRate: 0.1, bonusDays: 4 },
        ],
      },
    ],
  },
  {
    type: RecruitmentProductType.RECRUIT,
    name: RecruitmentProductName.BASIC,
    durations: [
      { duration: RecruitmentDuration.TWENTY_ONE_DAYS, bonusDays: 0, price: 23000, discountRate: 0.1 }, // 20,700원 적용
      { duration: RecruitmentDuration.FOURTEEN_DAYS, bonusDays: 0, price: 15400, discountRate: 0.1 }, // 13,950원 적용
      { duration: RecruitmentDuration.TEN_DAYS, bonusDays: 0, price: 11000, discountRate: 0.1 }, // 9,900원 적용
    ],
    options: [
      {
        name: RecruitmentProductOptionName.LIST_UP,
        maxListUpPerDay: 4,
        listUpIntervalHours: 6,
        tags: [],
        optionDurations: [
          { duration: RecruitmentDuration.THREE_DAYS, price: 14700, discountRate: 0.1 },
          { duration: RecruitmentDuration.FIVE_DAYS, price: 24500, discountRate: 0.1 },
          { duration: RecruitmentDuration.SEVEN_DAYS, price: 34300, discountRate: 0.1 },
          { duration: RecruitmentDuration.TEN_DAYS, price: 49000, discountRate: 0.1 },
          { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 68600, discountRate: 0.1 },
          { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 102900, discountRate: 0.1 },
        ],
      },
      {
        name: RecruitmentProductOptionName.TAG,
        tags: [RecruitmentOptionTag.NEW, RecruitmentOptionTag.POPULAR, RecruitmentOptionTag.RECOMMENDED],
        optionDurations: [
          { duration: RecruitmentDuration.THREE_DAYS, price: 5700, discountRate: 0.1 },
          { duration: RecruitmentDuration.FIVE_DAYS, price: 9500, discountRate: 0.1 },
          { duration: RecruitmentDuration.SEVEN_DAYS, price: 13300, discountRate: 0.1 },
          { duration: RecruitmentDuration.TEN_DAYS, price: 19000, discountRate: 0.1 },
          { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 26600, discountRate: 0.1 },
          { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 39900, discountRate: 0.1 },
        ],
      },
      {
        name: RecruitmentProductOptionName.HIGHLIGHT,
        tags: [],
        optionDurations: [
          { duration: RecruitmentDuration.THREE_DAYS, price: 5700, discountRate: 0.1 },
          { duration: RecruitmentDuration.FIVE_DAYS, price: 9500, discountRate: 0.1 },
          { duration: RecruitmentDuration.SEVEN_DAYS, price: 13300, discountRate: 0.1 },
          { duration: RecruitmentDuration.TEN_DAYS, price: 19000, discountRate: 0.1 },
          { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 26600, discountRate: 0.1 },
          { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 39900, discountRate: 0.1 },
        ],
      },
      {
        name: RecruitmentProductOptionName.BOLD,
        tags: [],
        optionDurations: [
          { duration: RecruitmentDuration.THREE_DAYS, price: 5700, discountRate: 0.1 },
          { duration: RecruitmentDuration.FIVE_DAYS, price: 9500, discountRate: 0.1 },
          { duration: RecruitmentDuration.SEVEN_DAYS, price: 13300, discountRate: 0.1 },
          { duration: RecruitmentDuration.TEN_DAYS, price: 19000, discountRate: 0.1 },
          { duration: RecruitmentDuration.FOURTEEN_DAYS, price: 26600, discountRate: 0.1 },
          { duration: RecruitmentDuration.TWENTY_ONE_DAYS, price: 39900, discountRate: 0.1 },
        ],
      },
    ],
  },
];

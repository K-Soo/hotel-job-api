export enum Benefits {
  // 급여제도 SALARY
  SALARY_RETIREMENT_PENSION = 'SALARY_RETIREMENT_PENSION',
  SALARY_INCENTIVE = 'SALARY_INCENTIVE',
  SALARY_BONUS = 'SALARY_BONUS',
  SALARY_LONG_TERM_RECOGNITION = 'SALARY_LONG_TERM_RECOGNITION',
  SALARY_PERFORMANCE_BONUS = 'SALARY_PERFORMANCE_BONUS',
  SALARY_SEVERANCE_PAY = 'SALARY_SEVERANCE_PAY',
  SALARY_EMPLOYEE_AWARD = 'SALARY_EMPLOYEE_AWARD',
  SALARY_NIGHT_ALLOWANCE = 'SALARY_NIGHT_ALLOWANCE',
  SALARY_HOLIDAY_ALLOWANCE = 'SALARY_HOLIDAY_ALLOWANCE',
  SALARY_ANNUAL_ALLOWANCE = 'SALARY_ANNUAL_ALLOWANCE',
  SALARY_POSITION_ALLOWANCE = 'SALARY_POSITION_ALLOWANCE',
  SALARY_CERTIFICATION_ALLOWANCE = 'SALARY_CERTIFICATION_ALLOWANCE',
  SALARY_LONG_TERM_ALLOWANCE = 'SALARY_LONG_TERM_ALLOWANCE',
  SALARY_RISK_ALLOWANCE = 'SALARY_RISK_ALLOWANCE',
  SALARY_SOCIAL_INSURANCE = 'SALARY_SOCIAL_INSURANCE',

  // 조직문화 CULTURE
  CULTURE_FLAT_ORGANIZATION = 'CULTURE_FLAT_ORGANIZATION',
  CULTURE_NO_COMPULSORY_MEALS = 'CULTURE_NO_COMPULSORY_MEALS',
  CULTURE_NIGHT_SHIFT_OPT_OUT = 'CULTURE_NIGHT_SHIFT_OPT_OUT',
  CULTURE_FREE_DRESS_CODE = 'CULTURE_FREE_DRESS_CODE',
  CULTURE_CULTURAL_MEETINGS = 'CULTURE_CULTURAL_MEETINGS',
  CULTURE_GUARANTEED_RETIREMENT = 'CULTURE_GUARANTEED_RETIREMENT',

  // 선물 GIFTS
  GIFTS_HOLIDAY_GIFT_OR_EXPENSES = 'GIFTS_HOLIDAY_GIFT_OR_EXPENSES',
  GIFTS_FOUNDATION_GIFT = 'GIFTS_FOUNDATION_GIFT',
  GIFTS_BIRTHDAY_GIFT_PARTY = 'GIFTS_BIRTHDAY_GIFT_PARTY',
  GIFTS_CHRISTMAS_GIFT = 'GIFTS_CHRISTMAS_GIFT',
  GIFTS_WEDDING_GIFT = 'GIFTS_WEDDING_GIFT',
  GIFTS_MATERNITY_GIFT = 'GIFTS_MATERNITY_GIFT',
  GIFTS_BIRTHDAY_EARLY_LEAVE = 'GIFTS_BIRTHDAY_EARLY_LEAVE',
  GIFTS_LONG_SERVICE_GIFT = 'GIFTS_LONG_SERVICE_GIFT',

  // 출퇴근 WORK_LIFE
  WORK_LIFE_DORMITORY_OPERATION = 'WORK_LIFE_DORMITORY_OPERATION',
  WORK_LIFE_VEHICLE_FUEL_SUPPORT = 'WORK_LIFE_VEHICLE_FUEL_SUPPORT',
  WORK_LIFE_COMMUTER_BUS = 'WORK_LIFE_COMMUTER_BUS',
  WORK_LIFE_HOUSING_PROVISION = 'WORK_LIFE_HOUSING_PROVISION',
  WORK_LIFE_HOUSING_LOAN = 'WORK_LIFE_HOUSING_LOAN',
  WORK_LIFE_NIGHT_COMMUTE_ALLOWANCE = 'WORK_LIFE_NIGHT_COMMUTE_ALLOWANCE',
  WORK_LIFE_COMPANY_VEHICLE = 'WORK_LIFE_COMPANY_VEHICLE',
  WORK_LIFE_PARKING_SUPPORT = 'WORK_LIFE_PARKING_SUPPORT',
  WORK_LIFE_RENT_SUPPORT = 'WORK_LIFE_RENT_SUPPORT',
  WORK_LIFE_HOUSING_ALLOWANCE = 'WORK_LIFE_HOUSING_ALLOWANCE',
  WORK_LIFE_COMMUTE_SUPPORT = 'WORK_LIFE_COMMUTE_SUPPORT',

  // 지원금/보험 SUPPORT_HEALTH
  SUPPORT_HEALTH_HEALTH_CHECKUP = 'SUPPORT_HEALTH_HEALTH_CHECKUP',
  SUPPORT_HEALTH_MEDICAL_SUPPORT_SELF = 'SUPPORT_HEALTH_MEDICAL_SUPPORT_SELF',
  SUPPORT_HEALTH_MEDICAL_SUPPORT_FAMILY = 'SUPPORT_HEALTH_MEDICAL_SUPPORT_FAMILY',
  SUPPORT_HEALTH_SMOKING_CESSATION = 'SUPPORT_HEALTH_SMOKING_CESSATION',
  SUPPORT_HEALTH_EMPLOYEE_LOAN = 'SUPPORT_HEALTH_EMPLOYEE_LOAN',
  SUPPORT_HEALTH_GROUP_INSURANCE = 'SUPPORT_HEALTH_GROUP_INSURANCE',
  SUPPORT_HEALTH_FITNESS_CENTER = 'SUPPORT_HEALTH_FITNESS_CENTER',
  SUPPORT_HEALTH_WEDDING_PREPARATION = 'SUPPORT_HEALTH_WEDDING_PREPARATION',
  SUPPORT_HEALTH_DISCOUNT_PRODUCTS = 'SUPPORT_HEALTH_DISCOUNT_PRODUCTS',
  SUPPORT_HEALTH_CULTURAL_ACTIVITY = 'SUPPORT_HEALTH_CULTURAL_ACTIVITY',
  SUPPORT_HEALTH_COMMUNICATION_SUPPORT = 'SUPPORT_HEALTH_COMMUNICATION_SUPPORT',
  SUPPORT_HEALTH_WELFARE_CARD_POINTS = 'SUPPORT_HEALTH_WELFARE_CARD_POINTS',
  SUPPORT_HEALTH_INTERNAL_WEDDING_HALL = 'SUPPORT_HEALTH_INTERNAL_WEDDING_HALL',
  SUPPORT_HEALTH_SCHOLARSHIP_CHILDREN = 'SUPPORT_HEALTH_SCHOLARSHIP_CHILDREN',
  SUPPORT_HEALTH_SUBSIDY_FOR_SURVEY = 'SUPPORT_HEALTH_SUBSIDY_FOR_SURVEY',
  SUPPORT_HEALTH_HEALTH_SUBSIDY = 'SUPPORT_HEALTH_HEALTH_SUBSIDY',
  SUPPORT_HEALTH_FREE_MEDICAL = 'SUPPORT_HEALTH_FREE_MEDICAL',
  SUPPORT_HEALTH_SELECTIVE_WELFARE = 'SUPPORT_HEALTH_SELECTIVE_WELFARE',
  SUPPORT_HEALTH_INTERNAL_RECRUITMENT = 'SUPPORT_HEALTH_INTERNAL_RECRUITMENT',

  // 리프레시 REFRESH
  REFRESH_ANNUAL_LEAVE = 'REFRESH_ANNUAL_LEAVE',
  REFRESH_SUMMER_LEAVE = 'REFRESH_SUMMER_LEAVE',
  REFRESH_FAMILY_EVENT_LEAVE = 'REFRESH_FAMILY_EVENT_LEAVE',
  REFRESH_HALF_DAY_LEAVE = 'REFRESH_HALF_DAY_LEAVE',
  REFRESH_REFRESH_LEAVE = 'REFRESH_REFRESH_LEAVE',
  REFRESH_FOUNDATION_DAY_LEAVE = 'REFRESH_FOUNDATION_DAY_LEAVE',
  REFRESH_LABOR_DAY_LEAVE = 'REFRESH_LABOR_DAY_LEAVE',
  REFRESH_LEAVE_ALLOWANCE = 'REFRESH_LEAVE_ALLOWANCE',
  REFRESH_AWARD_LEAVE = 'REFRESH_AWARD_LEAVE',
  REFRESH_MATERNITY_LEAVE = 'REFRESH_MATERNITY_LEAVE',
  REFRESH_PARENTAL_LEAVE = 'REFRESH_PARENTAL_LEAVE',
  REFRESH_PATERNITY_LEAVE = 'REFRESH_PATERNITY_LEAVE',
  REFRESH_SICK_LEAVE = 'REFRESH_SICK_LEAVE',
  REFRESH_HOLIDAY_FACILITY = 'REFRESH_HOLIDAY_FACILITY',
  REFRESH_FAMILY_DAY = 'REFRESH_FAMILY_DAY',
  REFRESH_TIME_OFF_EXTENSION = 'REFRESH_TIME_OFF_EXTENSION',
  REFRESH_PUBLIC_HOLIDAY_LEAVE = 'REFRESH_PUBLIC_HOLIDAY_LEAVE',
}

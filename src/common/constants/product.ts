// export enum ProductType {
//   // RESUME_JUMP_UP = 'RESUME_JUMP_UP',
//   JOB_POST_MAIN = 'JOB_POST_MAIN',
//   JOB_POST_PAGE = 'JOB_POST_PAGE',
//   // RESUME_VIEW = 'RESUME_VIEW',
// }

export enum RecruitmentProductType {
  RECRUIT = 'RECRUIT',
  MAIN = 'MAIN',
}

export enum RecruitmentProductName {
  PREMIUM = 'PREMIUM',
  SPECIAL = 'SPECIAL',
  URGENT = 'URGENT',
  BASIC = 'BASIC',
}

export enum RecruitmentProductOptionName {
  LIST_UP = 'LIST_UP', // 끌어올리기
  HIGHLIGHT = 'HIGHLIGHT', // 형광펜 강조
  TAG = 'TAG', // 태그 강조
  BOLD = 'BOLD', // 굵은 글씨
}

export enum RecruitmentDuration {
  THREE_DAYS = 3,
  FIVE_DAYS = 5,
  SEVEN_DAYS = 7,
  TEN_DAYS = 10,
  FOURTEEN_DAYS = 14,
  TWENTY_ONE_DAYS = 21,
}

export enum RecruitmentOptionTag {
  URGENT = 'URGENT', // 긴급태그
  POPULAR = 'POPULAR', // 인기태그
  RECOMMENDED = 'RECOMMENDED', // 추천태그
  NEW = 'NEW', // 신규태그
}

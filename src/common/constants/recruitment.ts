export enum RecruitmentQueryStatus {
  ALL = 'ALL', // 모든 상태
  PROGRESS = 'PROGRESS', // 진행중
  PUBLISHED = 'PUBLISHED', // 대기중
  CLOSED = 'CLOSED', // 마감
  REVIEWING = 'REVIEWING', // 확인중
  DRAFT = 'DRAFT', // 미완성
}

export enum RecruitmentStatus {
  PROGRESS = 'PROGRESS', // 진행중
  PUBLISHED = 'PUBLISHED', // 대기중
  CLOSED = 'CLOSED', // 마감
  REVIEWING = 'REVIEWING', // 확인중
  DRAFT = 'DRAFT', // 미완성
}

export enum EducationCondition {
  NOT_REQUIRED = 'NOT_REQUIRED', // 학력무관
  ELEMENTARY = 'ELEMENTARY', // 초등학교
  MIDDLE_SCHOOL = 'MIDDLE_SCHOOL', // 중학교
  HIGH_SCHOOL = 'HIGH_SCHOOL', // 고등학교
  COLLEGE_2_3_YEAR = 'COLLEGE_2_3_YEAR', // 대학교(2,3년)
  COLLEGE_4_YEAR = 'COLLEGE_4_YEAR', // 대학교(4년)
  MASTER = 'MASTER', // 대학원(석사)
  DOCTORATE = 'DOCTORATE', // 대학원(박사)
}

export enum ExperienceCondition {
  NOT_REQUIRED = 'NOT_REQUIRED',
  EXPERIENCED = 'EXPERIENCED',
  NEWBIE = 'NEWBIE',
}

export enum WorkingDay {
  WEEKDAYS_5 = 'WEEKDAYS_5',
  WEEKDAYS_6 = 'WEEKDAYS_6',
  WEEKEND_DAY = 'WEEKEND_DAY',
  WEEKEND_NIGHT = 'WEEKEND_NIGHT',
  NIGHT = 'NIGHT',
  TO_BE_DECIDED = 'TO_BE_DECIDED',

  TWO_SHIFT_DAY_DAY_NIGHT_NIGHT = 'TWO_SHIFT_DAY_DAY_NIGHT_NIGHT',
  TWO_SHIFT_DAY_NIGHT_OFF_OFF = 'TWO_SHIFT_DAY_NIGHT_OFF_OFF',
  TWO_SHIFT_DAY_NIGHT = 'TWO_SHIFT_DAY_NIGHT',

  THREE_SHIFT_DAY_DAY_NIGHT_NIGHT_OFF_OFF = 'THREE_SHIFT_DAY_DAY_NIGHT_NIGHT_OFF_OFF',
  THREE_SHIFT_DAY_NIGHT_OFF = 'THREE_SHIFT_DAY_NIGHT_OFF',
  THREE_SHIFT_MORNING_AFTERNOON_NIGHT = 'THREE_SHIFT_MORNING_AFTERNOON_NIGHT',
  ALTERNATE_DAY_SHIFT = 'ALTERNATE_DAY_SHIFT',
  ALTERNATE_NIGHT_SHIFT = 'ALTERNATE_NIGHT_SHIFT',
  ALTERNATE_2DAY_OFF = 'ALTERNATE_2DAY_OFF',
}

export enum Benefits {}

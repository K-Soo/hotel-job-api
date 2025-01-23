export enum Provider {
  LOCAL = 'LOCAL',
  KAKAO = 'KAKAO',
  GOOGLE = 'GOOGLE',
}

export enum Role {
  ADMIN = 'ADMIN',
  EMPLOYER = 'EMPLOYER',
  JOB_SEEKER = 'JOB_SEEKER',
}

export enum AccountStatus {
  ACTIVE = 'ACTIVE', //활성화되어 있으며 정상적으로 사용 가능한 상태.

  INACTIVE = 'INACTIVE', //계정이 비활성화된 상태. 사용자가 자발적으로 계정을 비활성화하거나, 관리자가 임시로 비활성화한 경우.

  BLOCKED = 'BLOCKED', //영구적 제한 상태(심각한 규칙 위반).

  SUSPENDED = 'SUSPENDED', // 계정이 임시적으로 제한된 상태. 예: 사기 탐지.

  LOCKED = 'LOCKED', // 보안상의 이유로 계정이 잠긴 상태. 비밀번호 시도 실패 등.

  DEACTIVATED = 'DEACTIVATED', //사용자가 계정을 삭제(탈퇴)한 상태. 데이터를 완전히 삭제하거나 일정 기간 유지 후 삭제될 수 있음.

  PENDING = 'PENDING', // 인증 절차(이메일, 전화번호 인증 등)가 완료되지 않은 상태.

  RECOVERY = 'RECOVERY', // 비밀번호 재설정 또는 계정 복구 절차 중인 상태.

  ANONYMIZED = 'ANONYMIZED', // 개인정보가 익명 처리된 상태.

  WAITING_APPROVAL = 'WAITING_APPROVAL', // 관리자 승인 대기 상태. 예: 기업 계정 요청.
}

export enum VerificationStatus {
  NOT_REQUESTED = 'NOT_REQUESTED',
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
}

export enum CertificationStatus {
  PENDING = 'PENDING', // 인증 대기 중
  VERIFIED = 'VERIFIED', // 인증 완료
  REJECTED = 'REJECTED', // 인증 거부
  UNVERIFIED = 'UNVERIFIED', // 인증되지 않음
}

export enum CertificationType {
  FIND_ID = 'FIND_ID',
  RESET_PASSWORD = 'RESET_PASSWORD',
  EMPLOYER = 'EMPLOYER',
  APPLICANT = 'APPLICANT',
  RECOVER_PASSWORD = 'RECOVER_PASSWORD',
}

export enum CommType {
  SKT = 'SKT', //SK 텔레콤
  LGT = 'LGT', // LG U+
  KTF = 'KTF', //KT
  SKM = 'SKM', //SKT 알뜰폰
  LGM = 'LGM', //LG U+ 알뜰폰
  KTM = 'KTM', //KT 알뜰폰
}

export enum LocalCode {
  DOMESTIC = '01', //내국인
  FOREIGN = '02', //외국인
}

export enum SexCode {
  MALE = '01', //남
  FEMALE = '02', //여
}

export enum Gender {
  NONE = 'NONE',
  MAIL = 'MAIL',
  FEMALE = 'FEMALE',
}

export enum ResumeStatus {
  DRAFT = 'DRAFT', // 작성 중(임시 저장 상태).
  PUBLISH = 'PUBLISH', // 제출 완료(정상 노출 가능 상태).
  HIDDEN = 'HIDDEN', // 사용자가 비공개 상태로 설정.
  ERROR = 'ERROR', // 처리 중 오류 발생.
}

export enum SanctionReason {
  NONE = 'NONE', // 제재 없음
  INAPPROPRIATE_LANGUAGE = 'INAPPROPRIATE_LANGUAGE', //욕설 또는 부적절한 언어 사용
  FALSE_INFORMATION = 'FALSE_INFORMATION', // 허위 정보 입력
  ILLEGAL_CONTENT = 'ILLEGAL_CONTENT', // 불법적 콘텐츠 포함
  POLICY_VIOLATION = 'POLICY_VIOLATION', // 기타 정책 위반
}

export enum Position {
  NONE = 'NONE', // 미선택
  INTERN = 'INTERN', // 인턴
  PART_TIME = 'PART_TIME', // 알바
  STAFF = 'STAFF', // 사원
  ASSISTANT_MANAGER = 'ASSISTANT_MANAGER', // 대리
  MANAGER = 'MANAGER', // 과장
  TEAM_LEADER = 'TEAM_LEADER', // 팀장
  DIRECTOR = 'DIRECTOR', // 이사
  GENERAL_MANAGER = 'GENERAL_MANAGER', // 부장
  EXECUTIVE = 'EXECUTIVE', // 임원
  CEO = 'CEO', // 대표
}

//직무
export enum Jobs {
  //공통
  MAINTENANCE = 'MAINTENANCE', // 시설 관리
  SECURITY = 'SECURITY', // 보안
  MANAGEMENT = 'MANAGEMENT', // 경영
  MARKETING = 'MARKETING', // 마케팅
  IT_SUPPORT = 'IT_SUPPORT', // IT 지원
  ADMIN_SUPPORT = 'ADMIN_SUPPORT', // 경영지원
  FACILITY_CLEANER = 'FACILITY_CLEANER', // 시설 미화원
  PARKING_ATTENDANT = 'PARKING_ATTENDANT', // 주차장 관리
  OTHER = 'OTHER', //기타

  // 모텔관련 직무
  CLEANING = 'CLEANING', // 청소
  CLEANING_TEAM = 'CLEANING_TEAM', // 청소부부팀
  BEDDING = 'BEDDING', // 배팅(침대)
  CASHIER = 'CASHIER', // 프론트 캐셔
  DUTY_OFFICER = 'DUTY_OFFICER', // 당직자
  DUTY_ASSISTANT = 'DUTY_ASSISTANT', // 당직자 보조
  CHEF = 'CHEF', // 주방
  KITCHEN_ASSISTANT = 'KITCHEN_ASSISTANT', // 주방 보조
  MANAGER = 'MANAGER', //지배인

  // 관광호텔 특화 직무
  GENERAL_MANAGER = 'GENERAL_MANAGER', // 총지배인
  ROOM_MANAGER = 'ROOM_MANAGER', // 객실지배인
  BANQUET_MANAGER = 'BANQUET_MANAGER', // 연회부 지배인
  FOOD_BEVERAGE_MANAGER = 'FOOD_BEVERAGE_MANAGER', // 식음료부 지배인
  OTHER_MANAGER = 'OTHER_MANAGER', // 기타 지배인

  HOUSEKEEPING = 'HOUSEKEEPING', // 객실 관리
  ROOM_ATTENDANT = 'ROOM_ATTENDANT', // 객실 청소
  FRONT_DESK = 'FRONT_DESK', // 프론트 데스크 캐셔
  CONCIERGE = 'CONCIERGE', // 컨시어지
  VALET_PARKING = 'VALET_PARKING', // 발레파킹
  BELLBOY = 'BELLBOY', // 벨보이
  EVENT_COORDINATOR = 'EVENT_COORDINATOR', // 이벤트 코디네이터
  SPA_THERAPIST = 'SPA_THERAPIST', // 스파 테라피스트
  SPA_MANAGER = 'SPA_MANAGER', // 스파 매니저
  FITNESS_TRAINER = 'FITNESS_TRAINER', // 피트니스 트레이너
  RESTAURANT_MANAGER = 'RESTAURANT_MANAGER', // 레스토랑 매니저
  BARTENDER = 'BARTENDER', // 바텐더
  HEAD_CHEF = 'HEAD_CHEF', // 요리사 (주방 책임자)
  TOUR_COORDINATOR = 'TOUR_COORDINATOR', // 관광 프로그램 코디네이터
  CASINO_DEALER = 'CASINO_DEALER', // 카지노 딜러 (해당 시설 포함 시)
  GIFT_SHOP_ATTENDANT = 'GIFT_SHOP_ATTENDANT', // 기프트숍 직원
  POOL_ATTENDANT = 'POOL_ATTENDANT', // 수영장 관리 요원
  KIDS_CLUB_STAFF = 'KIDS_CLUB_STAFF', // 키즈 클럽 직원
}

// 급여 유형
export enum SalaryType {
  NONE = 'NONE', // 미선택
  ANNUAL = 'ANNUAL', // 연봉
  MONTHLY = 'MONTHLY', // 월급 (기본급 + 수당)
  DAILY = 'DAILY', // 일급
  HOURLY = 'HOURLY', // 시급
}

export enum Language {
  NONE = 'NONE', // 선택되지 않음
  KOREAN = 'KOREAN', // 한국어
  ENGLISH = 'ENGLISH', // 영어
  SPANISH = 'SPANISH', // 스페인어
  MONGOLIAN = 'MONGOLIAN', // 몽골어
  JAPANESE = 'JAPANESE', // 일본어
  CHINESE = 'CHINESE', // 중국어
  GERMAN = 'GERMAN', // 독일어
  FRENCH = 'FRENCH', // 프랑스어
  RUSSIAN = 'RUSSIAN', // 러시아어
}

export enum Proficiency {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  NATIVE = 'NATIVE',
}

export enum LicenseStage {
  FIRST = 'FIRST', // 1차 합격
  SECOND = 'SECOND', // 2차 합격
  WRITTEN = 'WRITTEN', // 필기 합격
  PRACTICAL = 'PRACTICAL', // 실기 합격
  FINAL = 'FINAL', // 최종 합격
}

export enum MilitaryStatus {
  NONE = 'NONE', // 미선택
  NOT_APPLICABLE = 'NOT_APPLICABLE', // 대상 아님
  COMPLETED = 'COMPLETED', // 군필
  NOT_COMPLETED = 'NOT_COMPLETED', // 미필
  EXEMPTED = 'EXEMPTED', // 면제
  MEDICALLY_DISCHARGED = 'MEDICALLY_DISCHARGED', // 의가사 전역
}

export enum EducationLevel {
  ELEMENTARY = 'ELEMENTARY', // 초등학교
  MIDDLE_SCHOOL = 'MIDDLE_SCHOOL', // 중학교
  HIGH_SCHOOL = 'HIGH_SCHOOL', // 고등학교
  COLLEGE_2_3_YEAR = 'COLLEGE_2_3_YEAR', // 대학교(2,3년)
  COLLEGE_4_YEAR = 'COLLEGE_4_YEAR', // 대학교(4년)
  MASTER = 'MASTER', // 대학원(석사)
  DOCTORATE = 'DOCTORATE', // 대학원(박사)
}

export enum ResumeType {
  FILE = 'FILE', // 파일로 등록
  GENERAL = 'GENERAL', // 일반적인 등록
}

export enum CareerLevel {
  NEWBIE = 'NEWBIE', // 신입
  EXPERIENCED = 'EXPERIENCED', // 경력
}

// 고용 형태
export enum EmploymentType {
  FULL_TIME = 'FULL_TIME', // 정규직
  CONTRACT = 'CONTRACT', // 계약직
  PART_TIME = 'PART_TIME', // 아르바이트
  DAILY_WORKER = 'DAILY_WORKER', // 파출부
  INTERN = 'INTERN', // 인턴
}

// 복리후생
export enum Benefits {
  HEALTH_INSURANCE = 'HEALTH_INSURANCE', // 건강보험
  MEAL_SUPPORT = 'MEAL_SUPPORT', // 식사 지원
  TRANSPORTATION_SUPPORT = 'TRANSPORTATION_SUPPORT', // 교통비 지원
  HOUSING_SUPPORT = 'HOUSING_SUPPORT', // 숙식제공
  BONUS = 'BONUS', // 보너스 지급
  PAID_LEAVE = 'PAID_LEAVE', // 유급 휴가
  FLEXIBLE_WORK = 'FLEXIBLE_WORK', // 유연 근무제
  CHILDCARE_SUPPORT = 'CHILDCARE_SUPPORT', // 육아 지원
  RETIREMENT_PLAN = 'RETIREMENT_PLAN', // 퇴직금 제도
}

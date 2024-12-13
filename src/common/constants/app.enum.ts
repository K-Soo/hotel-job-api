export enum Provider {
  LOCAL = 'LOCAL',
  KAKAO = 'KAKAO',
}

export enum Role {
  ADMIN = 'ADMIN',
  EMPLOYER = 'EMPLOYER',
  JOB_SEEKER = 'JOB_SEEKER',
}

export enum ResumeStatus {
  DRAFT = 'DRAFT', // 작성 중(임시 저장 상태).
  SUBMITTED = 'SUBMITTED', // 제출 완료(정상 노출 가능 상태).
  HIDDEN = 'HIDDEN', // 관리자가 비노출 처리.
  DELETED = 'DELETED', // 삭제 처리.
}

export enum SanctionReason {
  NONE = 'NONE', // 제재 없음
  INAPPROPRIATE_LANGUAGE = 'INAPPROPRIATE_LANGUAGE', //욕설 또는 부적절한 언어 사용
  FALSE_INFORMATION = 'FALSE_INFORMATION', // 허위 정보 입력
  ILLEGAL_CONTENT = 'ILLEGAL_CONTENT', // 불법적 콘텐츠 포함
  POLICY_VIOLATION = 'POLICY_VIOLATION', // 기타 정책 위반
}

export enum Position {
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

export enum Job {
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
}

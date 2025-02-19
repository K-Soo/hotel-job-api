export enum ApplicationStatus {
  APPLIED = 'APPLIED', // 지원완료
  CANCELED = 'CANCELED', // 지원 취소
}

export enum ReviewStageStatus {
  DOCUMENT = 'DOCUMENT', // 서류전형
  INTERVIEW = 'INTERVIEW', // 면접전형
  INTERVIEW_PASS = 'INTERVIEW_PASS', // 면접전형 합격
  ACCEPT = 'ACCEPT', // 최종합격
  REJECT = 'REJECT', // 불합격
}

// 고용주(사업자) 측면
// 사업자 전용 전형 이동 단계
export enum EmployerReviewStageStatus {
  DOCUMENT = 'DOCUMENT', // 서류전형
  INTERVIEW = 'INTERVIEW', // 면접전형
  ACCEPT = 'ACCEPT', // 최종합격
  REJECT = 'REJECT', // 불합격
}

export enum AnnouncementType {
  ACCEPT = 'ACCEPT', // 최종합격
  REJECT = 'REJECT', // 최종불합격
}

export enum ResultNotificationStatus {
  DOCUMENT_PASS = 'DOCUMENT_PASS', // 서류 합격
  INTERVIEW_PASS = 'INTERVIEW_PASS', // 면접 합격
  FINAL_PASS = 'FINAL_PASS', // 최종 합격

  DOCUMENT_FAIL = 'DOCUMENT_FAIL', // 서류 불합격
  INTERVIEW_FAIL = 'INTERVIEW_FAIL', // 면접 불합격
  FAIL = 'FAIL', // 불합격
}

export enum ApplicationStatus {
  APPLIED = 'APPLIED', // 지원완료
  CANCELED = 'CANCELED', // 지원 취소
}

export enum ReviewStageStatus {
  DOCUMENT = 'DOCUMENT', // 서류전형
  INTERVIEW = 'INTERVIEW', // 면접전형
  ACCEPT = 'ACCEPT', // 최종합격
  REJECT = 'REJECT', // 불합격
}

export enum AnnouncementType {
  ACCEPT = 'ACCEPT', // 최종합격
  REJECT = 'REJECT', // 최종불합격
}

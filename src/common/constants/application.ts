export enum ApplicationStatus {
  APPLIED = 'APPLIED', // 지원완료
  CANCELED = 'CANCELED', // 지원 취소
}

export enum ReviewStageStatus {
  DOCUMENT = 'DOCUMENT', // 서류전형
  INTERVIEW = 'INTERVIEW', // 면접전형
  FINAL_ACCEPTED = 'FINAL_ACCEPTED', // 최종 합격
  REJECTED = 'REJECTED', // 불합격
}

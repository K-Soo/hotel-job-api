export enum PaymentStatus {
  /** 결제 진행 상태 */
  PAYMENT_PENDING = 'PAYMENT_PENDING', // 결제 대기 중
  PAYMENT_COMPLETED = 'PAYMENT_COMPLETED', // 결제 성공
  PAYMENT_FAILED = 'PAYMENT_FAILED', // 결제 실패
  PAYMENT_EXPIRED = 'PAYMENT_EXPIRED', // 결제 유효 기간 초과

  /** 취소 상태 */
  CANCEL_REQUESTED = 'CANCEL_REQUESTED', // 취소 요청됨
  CANCEL_COMPLETED = 'CANCEL_COMPLETED', // 취소 완료

  /** 환불 상태 */
  REFUND_REQUESTED = 'REFUND_REQUESTED', // 환불 요청됨
  REFUND_COMPLETED = 'REFUND_COMPLETED', // 환불 완료
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED', // 부분 환불 완료
}

export enum PaymentType {
  RECRUITMENT = 'RECRUITMENT', // 채용 상품
  RESUME_VIEW = 'RESUME_VIEW', // 이력서 상품
  ETC = 'ETC', // 기타 상품
}

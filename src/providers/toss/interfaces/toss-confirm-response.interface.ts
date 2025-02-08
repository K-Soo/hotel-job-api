export interface TossConfirmCard {
  issuerCode: string; //카드 발급사 두 자리 코드
  acquirerCode: string; //카드 매입사 두 자리 코드
  number: string; //카드 번호
  installmentPlanMonths: number; //할부 개월 수
  isInterestFree: false; //무이자 할부의 적용 여부
  interestPayer: null | string; //할부가 적용된 결제에서 할부 수수료를 부담하는 주체입니다. BUYER, CARD_COMPANY, MERCHANT
  approveNo: string; //카드사 승인 번호
  useCardPoint: false; //카드사 포인트 사용 여부, 일반 카드사 포인트가 아닌, 특수한 포인트나 바우처를 사용하면 할부 개월 수가 변경되어 응답이 돌아오니 유의
  cardType: '신용' | '체크' | '기프트' | '미확인'; //카드 종류
  ownerType: '개인' | '법인' | '미확인'; //카드의 소유자 타입
  acquireStatus: 'READY' | 'REQUESTED' | 'COMPLETED' | 'CANCEL_REQUESTED' | 'CANCELED'; //카드 결제의 매입 상태
  receiptUrl: string;
  amount: number; //카드사에 결제 요청한 금액
}

export interface TossConfirmResponse {
  mId: string; //상점 ID
  lastTransactionKey: string; //마지막 거래의 키값. 한 결제 건의 승인 거래와 취소 거래를 구분하는 데 사용됩니다. 예를 들어 결제 승인 후 부분 취소를 두 번 했다면 마지막 부분 취소 거래의 키값이 할당됩니다.
  paymentKey: string; //결제를 식별하는 역할로, 중복되지 않는 고유한 값입니다. 결제 데이터 관리를 위해 반드시 저장해야 합니다. 결제 상태가 변해도 값이 유지됩니다. 결제 승인, 결제 조회, 결제 취소 API에 사용합니다.
  orderId: string;
  orderName: string;
  taxExemptionAmount: number; //과세를 제외한 결제 금액(컵 보증금 등)입니다. 이 값은 결제 취소 및 부분 취소가 되면 과세 제외 금액도 일부 취소되어 값이 바뀝니다.
  status:
    | 'DONE'
    | 'READY'
    | 'IN_PROGRESS'
    | 'WAITING_FOR_DEPOSIT'
    | 'CANCELED'
    | 'PARTIAL_CANCELED'
    | 'ABORTED'
    | 'EXPIRED'; //결제 상태
  requestedAt: string; //결제가 일어난 날짜와 시간 정보
  approvedAt: string | null; //결제 승인이 일어난 날짜와 시간 정보
  useEscrow: boolean; //에스크로 사용 여부입니다.
  cultureExpense: boolean; //문화비 지출여부
  card: TossConfirmCard;
  virtualAccount: null; //가상계좌 필드
  transfer: null; //퀵계좌이체 서비스의 즉시할인에서 취소된 금액
  mobilePhone: null; //휴대폰 결제
  giftCertificate: null; //상품권 결제
  cashReceipt: null; //현금영수증
  cashReceipts: null;
  discount: null; //카드사 및 퀵계좌이체의 즉시 할인 프로모션 정보
  cancels: null; //결제취소이력
  secret: null; //웹훅을 검증하는 최대 50자 값
  type: 'NORMAL';
  //간편결제 정보
  easyPay: {
    provider: '토스페이';
    amount: 0;
    discountAmount: 0;
  };
  country: 'KR';
  failure: null; //결제 실패
  isPartialCancelable: true; //부분취소 가능여부
  receipt: {
    url: string; //발행된 영수증 정보
  };
  checkout: {
    url: string; //결제창 정보
  };
  currency: 'KRW';
  totalAmount: number;
  balanceAmount: number;
  suppliedAmount: number; //공급가액
  vat: number; //부가세
  taxFreeAmount: number; //결제 금액 중 면세 금액입니다. 결제 취소 및 부분 취소가 되면 면세 금액도 일부 취소되어 값이 바뀝니다.
  metadata: null;
  method: '카드' | '가상계좌' | '간편결제' | '휴대폰';
  version: string;
}

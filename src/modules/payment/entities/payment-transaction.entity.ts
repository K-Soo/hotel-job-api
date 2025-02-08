import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Payment } from './payment.entity';

@Entity()
export class PaymentTransaction {
  @ManyToOne(() => Payment, (payment) => payment.transactions, { onDelete: 'SET NULL' })
  payment: Payment | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  mId: string;

  @Column()
  lastTransactionKey: string;

  @Column({ unique: true })
  paymentKey: string; // ✅ 결제사 고유 결제 키

  @Column()
  orderId: string;

  @Column()
  orderName: string;

  @Column()
  status:
    | 'DONE'
    | 'READY'
    | 'IN_PROGRESS'
    | 'WAITING_FOR_DEPOSIT'
    | 'CANCELED'
    | 'PARTIAL_CANCELED'
    | 'ABORTED'
    | 'EXPIRED'; //결제 상태

  @Column({ nullable: true })
  secret: string;

  @Column()
  method: string; // ✅ 결제 수단 (카드, 가상계좌 등)

  @Column()
  type: 'NORMAL';

  @Column({ type: 'jsonb', nullable: true })
  failure: {
    code: string;
    message: string;
  } | null;

  @Column()
  isPartialCancelable: boolean; //부분취소 가능여부

  @Column({ type: 'jsonb', nullable: true })
  receipt: {
    url: string; //발행된 영수증 정보
  };

  @Column({ type: 'int' })
  totalAmount: number;

  @Column({ type: 'int' })
  balanceAmount: number;

  @Column({ type: 'int' })
  suppliedAmount: number; //공급가액

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  vat: number; //부가세

  // CARD INFO
  @Column()
  issuerCode: string; //카드 발급사 두 자리 코드

  @Column()
  acquirerCode: string;

  @Column()
  number: string; //카드번호

  @Column({ type: 'int' })
  installmentPlanMonths: number; //할부 개월 수

  @Column()
  isInterestFree: boolean; //무이자 할부의 적용 여부

  @Column({ nullable: true })
  interestPayer: string | null;

  @Column()
  approveNo: string; //카드사 승인 번호

  @Column()
  useCardPoint: boolean; //카드사 포인트 사용 여부, 일반 카드사 포인트가 아닌, 특수한 포인트나 바우처를 사용하면 할부 개월 수가 변경되어 응답이 돌아오니 유의

  @Column()
  cardType: '신용' | '체크' | '기프트' | '미확인'; //카드 종류

  @Column()
  ownerType: '개인' | '법인' | '미확인'; //카드의 소유자 타입

  @Column()
  acquireStatus: 'READY' | 'REQUESTED' | 'COMPLETED' | 'CANCEL_REQUESTED' | 'CANCELED'; //카드 결제의 매입 상태

  @Column({ type: 'int' })
  amount: number; //카드사에 결제 요청한 금액

  // DATE INFO
  @Column({ type: 'timestamptz', precision: 0 })
  requestedAt: Date;

  @Column({ type: 'timestamptz', precision: 0, nullable: true })
  approvedAt: Date | null;

  @CreateDateColumn({ type: 'timestamptz', precision: 0 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', precision: 0 })
  updatedAt: Date;
}

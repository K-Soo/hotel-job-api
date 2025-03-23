export enum ResponseStatus {
  SUCCESS = 'success', // 작업 성공
  FAILURE = 'failure', // 작업 실패
  DUPLICATE = 'duplicate', // 중복 상태
  AVAILABLE = 'available', // 사용 가능 상태
  UNAVAILABLE = 'unavailable', // 사용 불가능 상태

  NOT_FOUND = 'not_found',

  UNREAD_EXIST = 'unread_exist', // 읽지 않은 알림 있음
  ALL_READ = 'all_read', // 읽지 않은 알림 없음
}

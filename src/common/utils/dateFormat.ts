import * as moment from 'moment';

type DateFormatType =
  | 'YYYY.MM.DD'
  | 'YYYY.MM.DD HH:mm'
  | 'YYYY.MM.DD HH:mm:ss'
  | 'YYMMDD:HH:mm:ss'
  | 'HH:mm:ss'
  | 'YY.MM.DD'
  | 'YY.MM.DD HH:mm'
  | 'MM.DD HH:mm';

export const dateFormat = {
  date: (value: Date | string | null | undefined, format: DateFormatType) => {
    if (!value) {
      return 'unknown';
    }
    return moment(value).format(format);
  },
  /**
   * 현재 날짜 반환
   * @param format - 포맷 지정 (기본값: YYYY-MM-DD)
   */
  current: () => {
    return moment(new Date()).format('YYYY-MM-DD');
  },
  /**
   * 현재 시간 반환
   */
  currentTime: () => {
    return moment().format('HH:mm:ss');
  },
  /**
   * 타임존 적용 (Asia/Seoul 기준)
   */
  toKST: (date: Date | string = new Date(), format: DateFormatType = 'YYYY.MM.DD HH:mm') => {
    return moment(date).utcOffset(9).format(format); // UTC+9 = KST
  },
  /**
   * 해당 월의 첫 번째 날 반환
   * @param date - 기준 날짜 (기본값: 오늘)
   * @returns YYYY-MM-DD 00:00:00
   */
  getFirstDayOfMonth: (date: Date | string = new Date()): Date => {
    return moment(date).startOf('month').toDate();
  },
  /**
   * 해당 월의 마지막 날 반환 (23:59:59)
   * @param date - 기준 날짜 (기본값: 오늘)
   * @returns YYYY-MM-DD 23:59:59
   */
  getLastDayOfMonth: (date: Date | string = new Date()): Date => {
    return moment(date).endOf('month').toDate();
  },
  /**
   * 현재 월 반환 (1 ~ 12)
   */
  getCurrentMonth: (date: Date | string = new Date(), padded: boolean = false): string | number => {
    const month = moment(date).month() + 1;
    return padded ? String(month).padStart(2, '0') : month;
  },
};

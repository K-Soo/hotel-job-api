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
  current: () => {
    return moment(new Date()).format('YYYY-MM-DD');
  },
};

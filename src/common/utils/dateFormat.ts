import * as moment from 'moment';

export const dateFormat = {
  current: () => {
    return moment(new Date()).format('YYYY-MM-DD');
  },
};

import * as moment from 'moment';

export function calculatePostingPeriod(duration: number, bonusDays = 0) {
  const startDate = moment().startOf('day').toDate();
  const endDate = moment(startDate)
    .add(duration + bonusDays - 1, 'days')
    .endOf('day')
    .toDate();

  return { startDate, endDate };
}

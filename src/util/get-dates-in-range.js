import _ from 'lodash';
import getTime from 'date-fns/getTime';

import getIntervalsBetweenDates from './get-intervals-between-dates';

const utcAddMilliseconds = (dateFrom, milliseconds) =>
  new Date(getTime(dateFrom) + milliseconds);

const getDatesInRange = (dateFrom, dateTo, interval) => {
  const intervals = getIntervalsBetweenDates(dateFrom, dateTo, interval);

  return _.times(intervals, index =>
    utcAddMilliseconds(dateFrom, index * interval),
  );
};

export default getDatesInRange;

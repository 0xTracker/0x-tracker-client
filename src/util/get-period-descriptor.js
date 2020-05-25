import _ from 'lodash';

import { TIME_PERIOD } from '../constants';

const formatDate = (date) => {
  const parsedDate = new Date(date);
  const year = parsedDate.getUTCFullYear();
  const month = _.padStart(parsedDate.getUTCMonth() + 1, 2, 0);
  const day = _.padStart(parsedDate.getUTCDate(), 2, 0);

  return `${day}/${month}/${year}`;
};

const getDescriptorForDates = (dateFrom, dateTo) => {
  if (dateFrom !== undefined && dateTo !== undefined) {
    return `from ${formatDate(dateFrom)} to ${formatDate(dateTo)}`;
  }

  if (dateFrom !== undefined) {
    return `from ${formatDate(dateFrom)} to now`;
  }

  return `from 0x launch to ${formatDate(dateTo)}`;
};

const getPeriodDescriptor = (period) => {
  if (_.isPlainObject(period)) {
    return getDescriptorForDates(period.from, period.to);
  }

  return {
    [TIME_PERIOD.DAY]: 'from the past 24 hours',
    [TIME_PERIOD.WEEK]: 'from the past week',
    [TIME_PERIOD.MONTH]: 'from the past 30 days',
    [TIME_PERIOD.YEAR]: 'from the past year',
    [TIME_PERIOD.ALL]: 'since 0x launch',
  }[period];
};

export default getPeriodDescriptor;

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
    return `between ${formatDate(dateFrom)} and ${formatDate(dateTo)}`;
  }

  if (dateFrom !== undefined) {
    return `between ${formatDate(dateFrom)} and now`;
  }

  return `between 0x launch and ${formatDate(dateTo)}`;
};

const getPeriodDescriptor = (period, { prefix } = { prefix: 'from' }) => {
  if (_.isPlainObject(period)) {
    return getDescriptorForDates(period.from, period.to);
  }

  return {
    [TIME_PERIOD.DAY]: `${prefix} the past 24 hours`,
    [TIME_PERIOD.WEEK]: `${prefix} the past week`,
    [TIME_PERIOD.MONTH]: `${prefix} the past 30 days`,
    [TIME_PERIOD.YEAR]: `${prefix} the past year`,
    [TIME_PERIOD.ALL]: 'since 0x launch',
  }[period];
};

export default getPeriodDescriptor;

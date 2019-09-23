import { flow, map, sortBy, unionWith } from 'lodash/fp';
import isDateEqual from 'date-fns/isEqual';

import getDatesForTimePeriod from '../../../util/get-dates-for-time-period';

const padMetrics = (metrics, timePeriod, defaults) => {
  const dates = getDatesForTimePeriod(timePeriod);
  const paddedMetrics = flow([
    map(date => ({
      ...defaults,
      date,
    })),
    unionWith(
      (padding, metric) => isDateEqual(padding.date, metric.date),
      metrics,
    ),
    sortBy('date'),
  ])(dates);

  return paddedMetrics;
};

export default padMetrics;

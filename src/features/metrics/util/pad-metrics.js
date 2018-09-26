import { flow, map, sortBy, unionWith } from 'lodash/fp';
import { isEqual as isDateEqual } from 'date-fns';

import getDatesForTimePeriod from '../../../util/get-dates-for-time-period';

const padMetrics = (metrics, timePeriod, defaults) => {
  const dates = getDatesForTimePeriod(timePeriod);
  const paddedMetrics = flow([
    map(date => ({
      ...defaults,
      date,
    })),
    unionWith((a, b) => isDateEqual(a.date, b.date), metrics),
    sortBy('date'),
  ])(dates);

  return paddedMetrics;
};

export default padMetrics;

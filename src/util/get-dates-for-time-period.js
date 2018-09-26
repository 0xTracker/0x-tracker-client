import { subDays, subMonths, subWeeks, subYears } from 'date-fns';
import ms from 'ms';

import getDatesInRange from './get-dates-in-range';
import { GENESIS_DATE, TIME_PERIOD } from '../constants';

function dateFloor(date, duration) {
  return Math.floor(date / duration) * duration;
}

const INTERVAL_BY_PERIOD = {
  [TIME_PERIOD.DAY]: ms('30 minutes'),
  [TIME_PERIOD.WEEK]: ms('1 hour'),
  [TIME_PERIOD.MONTH]: ms('1 day'),
  [TIME_PERIOD.YEAR]: ms('1 day'),
  [TIME_PERIOD.ALL]: ms('1 day'),
};

const utcStartOfDay = date => {
  const clone = new Date(date);
  clone.setUTCHours(0, 0, 0, 0);
  return clone;
};

const utcStartOfHour = date => {
  const clone = new Date(date);
  clone.setUTCMinutes(0, 0, 0);
  return clone;
};

const getDatesForTimePeriod = (period, fromDate = new Date()) => {
  let startDate;
  let endDate;

  switch (period) {
    case TIME_PERIOD.DAY:
      endDate = dateFloor(fromDate, ms('30 minutes'));
      startDate = subDays(endDate, 1);
      break;
    case TIME_PERIOD.WEEK:
      endDate = utcStartOfHour(fromDate);
      startDate = subWeeks(endDate, 1);
      break;
    case TIME_PERIOD.MONTH:
      endDate = utcStartOfDay(fromDate);
      startDate = subMonths(endDate, 1);
      break;
    case TIME_PERIOD.YEAR:
      endDate = utcStartOfDay(fromDate);
      startDate = subYears(endDate, 1);
      break;
    case TIME_PERIOD.ALL:
      endDate = utcStartOfDay(fromDate);
      startDate = GENESIS_DATE;
      break;
    default:
      throw new Error(`Unknown time period: ${period}`);
  }

  return getDatesInRange(startDate, endDate, INTERVAL_BY_PERIOD[period]);
};

export default getDatesForTimePeriod;

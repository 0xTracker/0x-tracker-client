import { differenceInMilliseconds } from 'date-fns';

const getIntervalsBetweenDates = (dateFrom, dateTo, interval) =>
  differenceInMilliseconds(dateTo, dateFrom) / interval;

export default getIntervalsBetweenDates;

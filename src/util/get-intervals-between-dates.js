import differenceInMilliseconds from 'date-fns/differenceInMilliseconds';

const getIntervalsBetweenDates = (dateFrom, dateTo, interval) =>
  differenceInMilliseconds(dateTo, dateFrom) / interval;

export default getIntervalsBetweenDates;

import ms from 'ms';

import getIntervalsBetweenDates from './get-intervals-between-dates';

it('should return correct number of intervals for 1 hour', () => {
  const dateFrom = new Date('2018-03-12T10:50:00');
  const dateTo = new Date('2018-03-12T18:50:00');
  const numberOfIntervals = getIntervalsBetweenDates(
    dateFrom,
    dateTo,
    ms('1 hour'),
  );

  expect(numberOfIntervals).toBe(8);
});

it('should return correct number of intervals for 2 hours', () => {
  const dateFrom = new Date('2018-03-12T10:50:00');
  const dateTo = new Date('2018-03-12T18:50:00');
  const numberOfIntervals = getIntervalsBetweenDates(
    dateFrom,
    dateTo,
    ms('2 hours'),
  );

  expect(numberOfIntervals).toBe(4);
});

it('should return correct number of intervals for 1 day', () => {
  const dateFrom = new Date('2018-03-12T10:50:00');
  const dateTo = new Date('2018-03-18T10:50:00');
  const numberOfIntervals = getIntervalsBetweenDates(
    dateFrom,
    dateTo,
    ms('1 day'),
  );

  expect(numberOfIntervals).toBe(6);
});

it('should return correct number of intervals for 2 days', () => {
  const dateFrom = new Date('2018-03-12T10:50:00');
  const dateTo = new Date('2018-03-18T10:50:00');
  const numberOfIntervals = getIntervalsBetweenDates(
    dateFrom,
    dateTo,
    ms('2 days'),
  );

  expect(numberOfIntervals).toBe(3);
});

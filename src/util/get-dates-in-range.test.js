import ms from 'ms';

import getDatesInRange from './get-dates-in-range';

it('should get dates when interval is one day', () => {
  const dateFrom = new Date('2018-01-10T00:00:00Z');
  const dateTo = new Date('2018-02-15T00:00:00Z');
  const dates = getDatesInRange(dateFrom, dateTo, ms('1 day'));

  expect(dates).toMatchSnapshot();
});

it('should get dates when interval is thirty minutes', () => {
  const dateFrom = new Date('2018-01-10T00:00:00Z');
  const dateTo = new Date('2018-01-15T00:00:00Z');
  const dates = getDatesInRange(dateFrom, dateTo, ms('30 minutes'));

  expect(dates).toMatchSnapshot();
});

it('should get dates when interval is one hour', () => {
  const dateFrom = new Date('2018-01-10T00:00:00Z');
  const dateTo = new Date('2018-01-15T00:00:00Z');
  const dates = getDatesInRange(dateFrom, dateTo, ms('1 hour'));

  expect(dates).toMatchSnapshot();
});

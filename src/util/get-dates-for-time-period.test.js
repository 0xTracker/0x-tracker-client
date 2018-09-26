import { TIME_PERIOD } from '../constants';
import getDatesForTimePeriod from './get-dates-for-time-period';

describe('util/get-dates-for-time-period', () => {
  it('returns correct dates for day', () => {
    const dates = getDatesForTimePeriod(
      TIME_PERIOD.DAY,
      new Date('2018-02-08T00:00:00Z'),
    );

    expect(dates).toMatchSnapshot();
  });

  it('returns correct dates for week', () => {
    const dates = getDatesForTimePeriod(
      TIME_PERIOD.WEEK,
      new Date('2018-02-08T00:00:00Z'),
    );

    expect(dates).toMatchSnapshot();
  });

  it('returns correct dates for month', () => {
    const dates = getDatesForTimePeriod(
      TIME_PERIOD.MONTH,
      new Date('2018-02-08T00:00:00Z'),
    );

    expect(dates).toMatchSnapshot();
  });

  it('returns correct dates for year', () => {
    const dates = getDatesForTimePeriod(
      TIME_PERIOD.YEAR,
      new Date('2018-02-08T00:00:00Z'),
    );

    expect(dates).toMatchSnapshot();
  });

  it('returns correct dates for all', () => {
    const dates = getDatesForTimePeriod(
      TIME_PERIOD.ALL,
      new Date('2018-02-08T00:00:00Z'),
    );

    expect(dates).toMatchSnapshot();
  });
});

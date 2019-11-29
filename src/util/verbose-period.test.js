import { TIME_PERIOD } from '../constants';
import verbosePeriod from './verbose-period';

describe('util/verbose-period', () => {
  it('returns correct description for all periods', () => {
    expect(verbosePeriod(TIME_PERIOD.DAY)).toBe('24 hour');
    expect(verbosePeriod(TIME_PERIOD.WEEK)).toBe('7 day');
    expect(verbosePeriod(TIME_PERIOD.MONTH)).toBe('1 month');
    expect(verbosePeriod(TIME_PERIOD.YEAR)).toBe('1 year');
    expect(verbosePeriod(TIME_PERIOD.ALL)).toBe('all time');
  });
});

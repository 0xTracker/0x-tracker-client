import { TIME_PERIOD } from '../constants';
import prettyPeriod from './pretty-period';

describe('util/pretty-period', () => {
  it('returns correct label for period', () => {
    expect(prettyPeriod(TIME_PERIOD.DAY)).toBe('24H');
    expect(prettyPeriod(TIME_PERIOD.WEEK)).toBe('7D');
    expect(prettyPeriod(TIME_PERIOD.MONTH)).toBe('1M');
    expect(prettyPeriod(TIME_PERIOD.YEAR)).toBe('1Y');
    expect(prettyPeriod(TIME_PERIOD.ALL)).toBe('ALL');
  });
});

import { TIME_PERIOD } from '../constants';
import normalizePeriod from './normalize-period';

describe('util/pretty-period', () => {
  it('returns correct label for period', () => {
    expect(normalizePeriod(TIME_PERIOD.DAY)).toBe('24h');
    expect(normalizePeriod(TIME_PERIOD.WEEK)).toBe('7d');
    expect(normalizePeriod(TIME_PERIOD.MONTH)).toBe('1m');
    expect(normalizePeriod(TIME_PERIOD.YEAR)).toBe('1y');
    expect(normalizePeriod(TIME_PERIOD.ALL)).toBe('all');
  });
});

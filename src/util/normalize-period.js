import { TIME_PERIOD } from '../constants';

const mappings = {
  [TIME_PERIOD.DAY]: '24h',
  [TIME_PERIOD.WEEK]: '7d',
  [TIME_PERIOD.MONTH]: '1m',
  [TIME_PERIOD.YEAR]: '1y',
  [TIME_PERIOD.ALL]: 'all',
};

const normalizePeriod = period => mappings[period];

export default normalizePeriod;

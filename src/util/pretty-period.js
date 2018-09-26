import { TIME_PERIOD } from '../constants';

const periodLabels = {
  [TIME_PERIOD.DAY]: '24H',
  [TIME_PERIOD.WEEK]: '7D',
  [TIME_PERIOD.MONTH]: '1M',
  [TIME_PERIOD.YEAR]: '1Y',
  [TIME_PERIOD.ALL]: 'ALL',
};

const prettyPeriod = period => periodLabels[period];

export default prettyPeriod;

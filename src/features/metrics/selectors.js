import _ from 'lodash';
import objectHash from 'object-hash';

import { BASE_CURRENCY } from '../currencies/constants';
import { METRIC_TYPE } from './constants';
import { getConversionRate, getDisplayCurrency } from '../currencies/selectors';

const getMetrics = (metricType, period, filter) => state => {
  const hash = objectHash({
    filter,
    metricType,
    period,
  });
  const metrics = _.get(state, `metrics.${hash}`);

  if (metrics === undefined) {
    return undefined;
  }

  return metrics.map(metric => ({ ...metric, date: new Date(metric.date) }));
};

const getNetworkMetrics = (state, { period, relayerId }) => {
  const conversionRate = getConversionRate(state);
  const displayCurrency = getDisplayCurrency(state);
  const metrics = getMetrics(METRIC_TYPE.NETWORK, period, { relayerId })(state);

  if (displayCurrency === BASE_CURRENCY || metrics === undefined) {
    return metrics;
  }

  if (conversionRate === null) {
    return undefined;
  }

  return metrics.map(metric => ({
    ...metric,
    fees: {
      ...metric.fees,
      [displayCurrency]: metric.fees[BASE_CURRENCY] * conversionRate,
    },
    volume: metric.volume * conversionRate,
  }));
};

const getHistoricalTokenVolume = (token, period) => state => {
  const conversionRate = getConversionRate(state);
  const displayCurrency = getDisplayCurrency(state);
  const metrics = getMetrics(METRIC_TYPE.TOKEN_VOLUME, period, { token })(
    state,
  );

  if (displayCurrency === BASE_CURRENCY) {
    return metrics;
  }

  if (metrics === undefined || conversionRate === null) {
    return undefined;
  }

  return metrics.map(metric => ({
    ...metric,
    volume: {
      ...metric.volume,
      [displayCurrency]: metric.volume[BASE_CURRENCY] * conversionRate,
    },
  }));
};

export { getHistoricalTokenVolume, getNetworkMetrics };

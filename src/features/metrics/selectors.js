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

const getNetworkMetrics = (state, { period, relayer }) => {
  const conversionRate = getConversionRate(state);
  const displayCurrency = getDisplayCurrency(state);
  const metrics = getMetrics(METRIC_TYPE.NETWORK, period, { relayer })(state);

  if (displayCurrency === BASE_CURRENCY) {
    return metrics;
  }

  if (_.some([metrics, conversionRate], _.isUndefined)) {
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

const getTokenVolumeMetrics = (token, period) => state => {
  const conversionRate = getConversionRate(state);
  const displayCurrency = getDisplayCurrency(state);
  const metrics = getMetrics(METRIC_TYPE.TOKEN_VOLUME, period, { token })(
    state,
  );

  if (displayCurrency === BASE_CURRENCY) {
    return metrics;
  }

  if (_.some([metrics, conversionRate], _.isUndefined)) {
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

export { getTokenVolumeMetrics, getNetworkMetrics };

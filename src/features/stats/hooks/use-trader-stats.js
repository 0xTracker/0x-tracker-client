import _ from 'lodash';

import useApi from '../../../hooks/use-api';

const useTraderStats = ({ filters, period } = {}) =>
  useApi('stats/trader', {
    autoReload: true,
    params: _.isPlainObject(period)
      ? {
          ...(filters || {}),
          periodFrom: period.from,
          periodTo: period.to,
        }
      : {
          ...(filters || {}),
          period,
        },
  });

export default useTraderStats;

import _ from 'lodash';

import useApi from '../../../hooks/use-api';

const useNetworkStats = ({ filters, period } = {}) =>
  useApi('stats/network', {
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

export default useNetworkStats;

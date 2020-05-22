import _ from 'lodash';

import useApi from '../../../hooks/use-api';

const useNetworkMetrics = (
  { filters, granularity, period } = {},
  { autoReload } = { autoReload: true },
) =>
  useApi('metrics/network', {
    autoReload,
    params: _.isPlainObject(period)
      ? {
          ...(filters || {}),
          granularity,
          periodFrom: period.from,
          periodTo: period.to,
        }
      : {
          ...(filters || {}),
          granularity,
          period,
        },
  });

export default useNetworkMetrics;

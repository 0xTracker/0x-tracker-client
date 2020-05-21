import useApi from '../../../hooks/use-api';

const useNetworkStats = ({ filters, period } = {}) =>
  useApi('stats/network', {
    autoReload: true,
    params: {
      ...(filters || {}),
      period,
    },
  });

export default useNetworkStats;

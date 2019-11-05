import useApi from '../../../hooks/use-api';

const useNetworkStats = ({ period } = {}) =>
  useApi('stats/network', {
    autoReload: true,
    params: {
      period,
    },
    version: 2,
  });

export default useNetworkStats;

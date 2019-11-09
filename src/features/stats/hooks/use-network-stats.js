import useApi from '../../../hooks/use-api';

const useNetworkStats = ({ period } = {}) =>
  useApi('stats/network', {
    autoReload: true,
    params: {
      period,
    },
  });

export default useNetworkStats;

import useApi from '../../../hooks/use-api';

const useNetworkMetrics = ({ period, relayerId } = {}) =>
  useApi('metrics/network', {
    autoReload: true,
    params: {
      period,
      relayer: relayerId,
    },
  });

export default useNetworkMetrics;

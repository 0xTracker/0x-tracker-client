import useApi from '../../../hooks/use-api';

const useRelayerMetrics = (relayerId, { period } = {}) =>
  useApi('metrics/relayer', {
    autoReload: true,
    params: {
      period,
      relayer: relayerId,
    },
  });

export default useRelayerMetrics;

import useApi from '../../../hooks/use-api';

const useNetworkMetrics = (
  { period, relayerId } = {},
  { autoReload } = { autoReload: true },
) =>
  useApi('metrics/network', {
    autoReload,
    params: {
      period,
      relayer: relayerId,
    },
  });

export default useNetworkMetrics;

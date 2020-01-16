import useApi from '../../../hooks/use-api';

const useRelayerMetrics = (
  relayerId,
  { period } = {},
  { autoReload } = { autoReload: true },
) =>
  useApi('metrics/relayer', {
    autoReload,
    params: {
      period,
      relayer: relayerId,
    },
  });

export default useRelayerMetrics;

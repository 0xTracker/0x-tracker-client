import useApi from '../../../hooks/use-api';

const useRelayerMetrics = (
  relayerId,
  { granularity, period } = {},
  { autoReload } = { autoReload: true },
) =>
  useApi('metrics/relayer', {
    autoReload,
    params: {
      granularity,
      period,
      relayer: relayerId,
    },
  });

export default useRelayerMetrics;

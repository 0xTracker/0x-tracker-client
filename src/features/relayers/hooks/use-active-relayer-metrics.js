import useApi from '../../../hooks/use-api';

const useActiveRelayerMetrics = (
  { granularity, period } = {},
  { autoReload } = { autoReload: true },
) =>
  useApi('metrics/active-relayer', {
    autoReload,
    params: {
      granularity,
      period,
    },
  });

export default useActiveRelayerMetrics;

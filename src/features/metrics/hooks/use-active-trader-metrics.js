import useApi from '../../../hooks/use-api';

const useActiveTraderMetrics = (
  { granularity, period } = {},
  { autoReload } = { autoReload: true },
) =>
  useApi('metrics/active-trader', {
    autoReload,
    params: {
      granularity,
      period,
    },
  });

export default useActiveTraderMetrics;

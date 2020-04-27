import useApi from '../../../hooks/use-api';

const useTraderMetrics = (
  address,
  { granularity, period } = {},
  { autoReload } = { autoReload: true },
) =>
  useApi('metrics/trader', {
    autoReload,
    params: {
      address,
      granularity,
      period,
    },
  });

export default useTraderMetrics;

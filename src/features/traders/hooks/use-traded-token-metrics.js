import useApi from '../../../hooks/use-api';

const useTradedTokenMetrics = (
  { granularity, period } = {},
  { autoReload } = { autoReload: true },
) =>
  useApi('metrics/traded-token', {
    autoReload,
    params: {
      granularity,
      period,
    },
  });

export default useTradedTokenMetrics;

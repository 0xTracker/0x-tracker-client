import useApi from '../../../hooks/use-api';

const useTokenMetrics = (
  tokenAddress,
  { granularity, period } = {},
  { autoReload } = { autoReload: true },
) =>
  useApi('metrics/token', {
    autoReload,
    params: {
      granularity,
      period,
      token: tokenAddress,
    },
  });

export default useTokenMetrics;

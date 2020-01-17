import useApi from '../../../hooks/use-api';

const useTokenMetrics = (
  tokenAddress,
  { period } = {},
  { autoReload } = { autoReload: true },
) =>
  useApi('metrics/token', {
    autoReload,
    params: {
      period,
      token: tokenAddress,
    },
  });

export default useTokenMetrics;

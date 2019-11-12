import useApi from '../../../hooks/use-api';

const useTokenMetrics = (tokenAddress, { period } = {}) =>
  useApi('metrics/token', {
    autoReload: true,
    params: {
      period,
      token: tokenAddress,
    },
  });

export default useTokenMetrics;

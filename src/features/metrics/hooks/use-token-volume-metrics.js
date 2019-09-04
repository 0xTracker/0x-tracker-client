import useApi from '../../../hooks/use-api';

const useTokenVolumeMetrics = (tokenAddress, { period } = {}) =>
  useApi('metrics/token-volume', {
    autoReload: true,
    params: {
      period,
      token: tokenAddress,
    },
  });

export default useTokenVolumeMetrics;

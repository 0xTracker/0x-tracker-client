import useApi from '../../../hooks/use-api';

const useTokenVolumeMetrics = (tokenAddress, { period } = {}) => {
  const { error, loading, response } = useApi(
    'metrics/token-volume',
    {
      autoReload: true,
      params: {
        period,
        token: tokenAddress,
      },
    },
    [period, tokenAddress],
  );

  return {
    data: response,
    error,
    loading,
  };
};

export default useTokenVolumeMetrics;

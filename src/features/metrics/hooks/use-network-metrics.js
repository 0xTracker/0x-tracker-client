import useApi from '../../../hooks/use-api';

const useNetworkMetrics = ({ period, relayerId } = {}) => {
  const { error, loading, response } = useApi(
    'metrics/network',
    {
      autoReload: true,
      params: {
        period,
        relayer: relayerId,
      },
    },
    [period, relayerId],
  );

  return {
    data: response,
    error,
    loading,
  };
};

export default useNetworkMetrics;

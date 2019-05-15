import useApi from '../../../hooks/use-api';

const useNetworkStats = ({ period } = {}) => {
  const { error, loading, response } = useApi(
    'stats/network',
    {
      autoReload: true,
      params: {
        period,
      },
    },
    [period],
  );

  return [response, loading, error];
};

export default useNetworkStats;

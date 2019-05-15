import useApi from '../../../hooks/use-api';

const useRelayerStats = ({ period } = {}) => {
  const { error, loading, response } = useApi(
    'stats/relayer',
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

export default useRelayerStats;

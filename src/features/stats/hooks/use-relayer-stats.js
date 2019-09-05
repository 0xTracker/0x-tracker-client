import useApi from '../../../hooks/use-api';

const useRelayerStats = ({ period } = {}) =>
  useApi('stats/relayer', {
    autoReload: true,
    params: {
      period,
    },
  });

export default useRelayerStats;

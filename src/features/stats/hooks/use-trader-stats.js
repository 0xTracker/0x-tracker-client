import useApi from '../../../hooks/use-api';

const useTraderStats = ({ period } = {}) =>
  useApi('stats/trader', {
    autoReload: true,
    params: {
      period,
    },
  });

export default useTraderStats;

import useApi from '../../../hooks/use-api';

const useTraderMetrics = (address, { period } = {}) =>
  useApi('metrics/trader', {
    autoReload: true,
    params: {
      address,
      period,
    },
  });

export default useTraderMetrics;

import useApi from '../../../hooks/use-api';

const useTraderMetrics = (
  address,
  { period } = {},
  { autoReload } = { autoReload: true },
) =>
  useApi('metrics/trader', {
    autoReload,
    params: {
      address,
      period,
    },
  });

export default useTraderMetrics;

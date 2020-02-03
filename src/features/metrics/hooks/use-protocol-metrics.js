import useApi from '../../../hooks/use-api';

const useProtocolMetrics = (
  { granularity, period } = {},
  { autoReload } = { autoReload: true },
) =>
  useApi('metrics/protocol', {
    autoReload,
    params: {
      granularity,
      period,
    },
  });

export default useProtocolMetrics;

import useApi from '../../../hooks/use-api';

const useProtocolMetrics = (
  { period } = {},
  { autoReload } = { autoReload: true },
) =>
  useApi('metrics/protocol', {
    autoReload,
    params: {
      period,
    },
  });

export default useProtocolMetrics;

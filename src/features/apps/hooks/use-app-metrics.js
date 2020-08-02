import useApi from '../../../hooks/use-api';

const useAppMetrics = (
  app,
  { granularity, period } = {},
  { autoReload } = { autoReload: true },
) =>
  useApi('metrics/app', {
    autoReload,
    params: {
      app,
      granularity,
      period,
    },
  });

export default useAppMetrics;

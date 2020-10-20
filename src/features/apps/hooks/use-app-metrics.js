import useApi from '../../../hooks/use-api';

const useAppMetrics = (
  appId,
  { granularity, period } = {},
  { autoReload } = { autoReload: true },
) =>
  useApi('metrics/app', {
    autoReload,
    params: {
      app: appId,
      granularity,
      period,
    },
  });

export default useAppMetrics;

import useApi from '../../../hooks/use-api';

const useTraderMetrics = (
  address,
  { granularity, period } = {},
  { autoReload } = { autoReload: true },
) => {
  const [metrics, loading] = useApi('metrics/trader', {
    autoReload,
    params: {
      address,
      granularity,
      period,
    },
  });

  return [
    metrics !== undefined
      ? metrics.map((metric) => ({ ...metric, date: new Date(metric.date) }))
      : undefined,
    loading,
  ];
};

export default useTraderMetrics;

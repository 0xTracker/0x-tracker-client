import useApi from '../../../hooks/use-api';

const useAssetBridgingMetrics = (
  { granularity, period } = {},
  { autoReload } = { autoReload: true },
) =>
  useApi('metrics/asset-bridging', {
    autoReload,
    params: {
      granularity,
      period,
    },
  });

export default useAssetBridgingMetrics;

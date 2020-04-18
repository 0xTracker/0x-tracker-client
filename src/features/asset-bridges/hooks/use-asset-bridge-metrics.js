import useApi from '../../../hooks/use-api';

const useAssetBridgeMetrics = (
  bridgeAddress,
  { granularity, period } = {},
  { autoReload } = { autoReload: true },
) =>
  useApi('metrics/asset-bridge', {
    autoReload,
    params: {
      address: bridgeAddress,
      granularity,
      period,
    },
  });

export default useAssetBridgeMetrics;

import useApi from '../../../hooks/use-api';

const useAssetBridgingStats = (period) =>
  useApi('stats/asset-bridging', {
    autoReload: true,
    params: {
      period,
    },
  });

export default useAssetBridgingStats;

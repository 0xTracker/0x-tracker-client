import _ from 'lodash';

import useApi from '../../../hooks/use-api';

const useAssetBridges = (options = {}) => {
  const [response, loading] = useApi('asset-bridges', {
    autoReload: options.autoReload,
    params: _.pick(options, ['limit', 'page', 'statsPeriod']),
  });

  const { limit, page, pageCount, assetBridges, total } = response || {};

  return [
    {
      items: assetBridges,
      page,
      pageCount,
      pageSize: limit,
      recordCount: total,
    },
    loading,
  ];
};

export default useAssetBridges;

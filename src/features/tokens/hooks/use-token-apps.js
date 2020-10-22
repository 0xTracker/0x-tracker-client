import _ from 'lodash';

import useApi from '../../../hooks/use-api';

const useTokenApps = (tokenAddress, options = {}) => {
  const [response, loading] = useApi(`tokens/${tokenAddress}/apps`, {
    autoReload: options.autoReload,
    params: _.pick(options, ['limit', 'page', 'sortBy', 'statsPeriod']),
  });

  const { apps, limit, pageCount, sortBy, statsPeriod, total } = response || {};

  return [
    {
      items: apps,
      limit,
      pageCount,
      sortBy,
      statsPeriod,
      total,
    },
    loading,
  ];
};

export default useTokenApps;

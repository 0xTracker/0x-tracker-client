import _ from 'lodash';

import useApi from '../../../hooks/use-api';

const useTokenRelayers = (tokenAddress, options = {}) => {
  const [response, loading] = useApi(`tokens/${tokenAddress}/relayers`, {
    autoReload: options.autoReload,
    params: _.pick(options, ['limit', 'page', 'sortBy', 'statsPeriod']),
  });

  const { limit, pageCount, relayers, sortBy, statsPeriod, total } =
    response || {};

  return [
    {
      items: relayers,
      limit,
      pageCount,
      sortBy,
      statsPeriod,
      total,
    },
    loading,
  ];
};

export default useTokenRelayers;

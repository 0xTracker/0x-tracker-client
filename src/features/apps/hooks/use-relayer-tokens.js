import _ from 'lodash';

import useApi from '../../../hooks/use-api';

const useRelayerTokens = (relayerSlug, options = {}) => {
  const [response, loading] = useApi(`relayers/${relayerSlug}/tokens`, {
    autoReload: options.autoReload,
    params: _.pick(options, ['limit', 'page', 'sortBy', 'statsPeriod']),
  });

  const { limit, pageCount, tokens, sortBy, statsPeriod, total } =
    response || {};

  return [
    {
      items: tokens,
      limit,
      pageCount,
      sortBy,
      statsPeriod,
      total,
    },
    loading,
  ];
};

export default useRelayerTokens;

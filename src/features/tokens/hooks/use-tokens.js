import _ from 'lodash';

import useApi from '../../../hooks/use-api';

const useTokens = (options = {}) => {
  const [response, loading] = useApi('tokens', {
    autoReload: options.autoReload,
    params: _.pick(options, ['limit', 'page', 'statsPeriod', 'type']),
  });

  const { limit, page, pageCount, tokens, total } = response || {};

  return [
    {
      items: tokens,
      page,
      pageCount,
      pageSize: limit,
      recordCount: total,
    },
    loading,
  ];
};

export default useTokens;

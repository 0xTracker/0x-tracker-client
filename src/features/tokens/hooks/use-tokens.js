import _ from 'lodash';

import useApi from '../../../hooks/use-api';

const useTokens = (options = {}) => {
  const { error, loading, response } = useApi(
    'tokens',
    {
      autoReload: options.autoReload,
      params: _.pick(options, ['limit', 'page', 'statsPeriod']),
    },
    Object.values(options),
  );
  const { limit, page, pageCount, tokens, total } = response || {};

  if (error) {
    throw error;
  }

  return [
    { items: tokens, page, pageCount, pageSize: limit, recordCount: total },
    loading,
  ];
};

export default useTokens;

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
      items: Array.isArray(tokens)
        ? tokens.map((token) => ({
            ...token,
            lastTrade:
              token.lastTrade !== null
                ? {
                    ...token.lastTrade,
                    date: new Date(token.lastTrade.date),
                  }
                : null,
          }))
        : undefined,
      page,
      pageCount,
      pageSize: limit,
      recordCount: total,
    },
    loading,
  ];
};

export default useTokens;

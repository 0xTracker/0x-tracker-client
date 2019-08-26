import _ from 'lodash';

import useApi from '../../../hooks/use-api';

const useRelayers = (options = {}) => {
  const { error, loading, response } = useApi(
    'relayers',
    {
      autoReload: options.autoReload,
      params: _.pick(options, ['limit', 'page', 'statsPeriod']),
    },
    Object.values(options),
  );
  const { limit, page, pageCount, relayers, total } = response || {};

  return [
    { items: relayers, page, pageCount, pageSize: limit, recordCount: total },
    loading,
    error,
  ];
};

export default useRelayers;

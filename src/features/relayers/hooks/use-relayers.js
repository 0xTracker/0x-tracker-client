import _ from 'lodash';

import useApi from '../../../hooks/use-api';

const useRelayers = (options = {}, deps) => {
  const { error, loading, response } = useApi(
    'relayers',
    {
      autoReload: options.autoReload,
      params: _.pick(options, ['limit', 'sortBy']),
      version: 2,
    },
    deps,
  );
  const { page, pageCount, relayers, total } = response || {};

  return [
    { items: relayers, page, pageCount, recordCount: total },
    loading,
    error,
  ];
};

export default useRelayers;

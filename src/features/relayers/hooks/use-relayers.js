import _ from 'lodash';

import useApi from '../../../hooks/use-api';

const useRelayers = (options = {}) => {
  const [response, loading] = useApi('relayers', {
    autoReload: options.autoReload,
    params: _.pick(options, ['limit', 'page', 'statsPeriod']),
  });

  const { limit, page, pageCount, relayers, total } = response || {};

  return [
    { items: relayers, page, pageCount, pageSize: limit, recordCount: total },
    loading,
  ];
};

export default useRelayers;

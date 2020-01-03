import _ from 'lodash';

import useApi from '../../../hooks/use-api';

const useProtocols = (options = {}) => {
  const [response, loading] = useApi('protocols', {
    autoReload: options.autoReload,
    params: _.pick(options, ['limit', 'page', 'statsPeriod', 'sortBy']),
  });

  const { limit, page, pageCount, protocols, total } = response || {};

  return [
    { items: protocols, page, pageCount, pageSize: limit, recordCount: total },
    loading,
  ];
};

export default useProtocols;

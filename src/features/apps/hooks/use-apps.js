import _ from 'lodash';

import useApi from '../../../hooks/use-api';

const useApps = (options = {}) => {
  const [response, loading] = useApi('apps', {
    autoReload: options.autoReload,
    params: _.pick(options, [
      'limit',
      'page',
      'sortBy',
      'sortDirection',
      'statsPeriod',
    ]),
  });

  const { limit, page, pageCount, apps, total } = response || {};

  return [
    { items: apps, page, pageCount, pageSize: limit, recordCount: total },
    loading,
  ];
};

export default useApps;

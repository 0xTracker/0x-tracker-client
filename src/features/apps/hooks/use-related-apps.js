import _ from 'lodash';

import useApi from '../../../hooks/use-api';

const useRelatedApps = (urlSlug, options = {}) => {
  const [response, loading] = useApi(`apps/${urlSlug}/related-apps`, {
    autoReload: options.autoReload,
    params: _.pick(options, ['limit', 'page', 'sortBy', 'statsPeriod']),
  });

  const { apps, limit, pageCount, sortBy, statsPeriod, total } = response || {};

  return [
    {
      items: apps,
      limit,
      pageCount,
      sortBy,
      statsPeriod,
      total,
    },
    loading,
  ];
};

export default useRelatedApps;

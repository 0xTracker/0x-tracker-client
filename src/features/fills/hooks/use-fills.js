import useApi from '../../../hooks/use-api';

const useFills = (options = {}) => {
  const filter = options.filter || {};

  const [response, loading] = useApi('fills', {
    autoReload: options.autoReload,
    params: {
      ...filter,
      apps: Array.isArray(filter.apps) ? filter.apps.join(',') : undefined,
      limit: options.limit,
      page: options.page,
      sortBy: options.sortBy,
      sortDirection: options.sortDirection,
    },
  });

  const { fills, limit, page, pageCount, total } = response || {};

  return [
    { items: fills, page, pageCount, pageSize: limit, recordCount: total },
    loading,
  ];
};

export default useFills;

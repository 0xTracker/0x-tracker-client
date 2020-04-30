import useApi from '../../../hooks/use-api';

const useTraders = (options = {}) => {
  const [response, loading] = useApi('traders', {
    autoReload: options.autoReload,
    params: {
      limit: options.limit,
      page: options.page,
      sortBy: options.sortBy,
      statsPeriod: options.statsPeriod,
      type: options.type,
    },
  });
  const { traders, limit, page, pageCount, total } = response || {};

  return [
    { items: traders, page, pageCount, pageSize: limit, recordCount: total },
    loading,
  ];
};

export default useTraders;

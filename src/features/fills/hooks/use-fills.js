import useApi from '../../../hooks/use-api';

const useFills = (options = {}) => {
  const filter = options.filter || {};

  const [response, loading] = useApi('fills', {
    autoReload: options.autoReload,
    params: {
      limit: options.limit,
      page: options.page,
      ...filter,
    },
  });

  const { fills, limit, page, pageCount, total } = response || {};

  return [
    { items: fills, page, pageCount, pageSize: limit, recordCount: total },
    loading,
  ];
};

export default useFills;

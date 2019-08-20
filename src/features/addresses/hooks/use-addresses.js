import useApi from '../../../hooks/use-api';

const useAddresses = (options = {}) => {
  const { error, loading, response } = useApi(
    'addresses',
    {
      autoReload: options.autoReload,
      params: {
        limit: options.limit,
        page: options.page,
        statsPeriod: options.statsPeriod,
      },
    },
    Object.values(options),
  );
  const { addresses, limit, page, pageCount, total } = response || {};

  return [
    { items: addresses, page, pageCount, pageSize: limit, recordCount: total },
    loading,
    error,
  ];
};

export default useAddresses;

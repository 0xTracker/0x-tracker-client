import useApi from '../../../hooks/use-api';

const useAddresses = (options = {}) => {
  const [response, loading] = useApi('addresses', {
    autoReload: options.autoReload,
    params: {
      limit: options.limit,
      page: options.page,
      statsPeriod: options.statsPeriod,
    },
  });
  const { addresses, limit, page, pageCount, total } = response || {};

  return [
    { items: addresses, page, pageCount, pageSize: limit, recordCount: total },
    loading,
  ];
};

export default useAddresses;

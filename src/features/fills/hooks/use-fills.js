import useApi from '../../../hooks/use-api';

const useFills = (options = {}) => {
  const { address, dateFrom, dateTo, protocolVersion, relayer, status, token } =
    options.filter || {};

  const [response, loading] = useApi('fills', {
    autoReload: options.autoReload,
    params: {
      dateFrom,
      dateTo,
      limit: options.limit,
      page: options.page,
      protocolVersion,
      q: address,
      relayer,
      status,
      token,
    },
  });

  const { fills, limit, page, pageCount, total } = response || {};

  return [
    { items: fills, page, pageCount, pageSize: limit, recordCount: total },
    loading,
  ];
};

export default useFills;

import useApi from '../../../hooks/use-api';

const useFills = (options = {}) => {
  const { address, relayer, token } = options.filter || {};

  const [response, loading] = useApi('fills', {
    autoReload: options.autoReload,
    clearPreviousResponse: options.clearPreviousResponse,
    params: {
      limit: options.limit,
      page: options.page,
      q: address,
      relayer,
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

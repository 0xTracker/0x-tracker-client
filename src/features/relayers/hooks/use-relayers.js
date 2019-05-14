import useApi from '../../../hooks/use-api';

const useRelayers = (options = {}, deps) => {
  const { error, loading, response } = useApi(
    'relayers',
    {
      autoReload: options.autoReload,
      params: { limit: options.limit },
      version: 2,
    },
    deps,
  );
  const { page, pageCount, relayers, total } = response || {};

  return [
    { items: relayers, page, pageCount, recordCount: total },
    loading,
    error,
  ];
};

export default useRelayers;

import useApi from '../../../hooks/use-api';

const useAddressMetrics = (address, { period } = {}) => {
  const { error, loading, response } = useApi(
    'metrics/address',
    {
      autoReload: true,
      params: {
        address,
        period,
      },
    },
    [address, period],
  );

  return {
    data: response,
    error,
    loading,
  };
};

export default useAddressMetrics;

import useApi from '../../../hooks/use-api';

const useAddressMetrics = (address, { period } = {}) =>
  useApi('metrics/address', {
    autoReload: true,
    params: {
      address,
      period,
    },
  });

export default useAddressMetrics;

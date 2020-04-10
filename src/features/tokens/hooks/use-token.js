import useApi from '../../../hooks/use-api';

const useToken = (tokenAddress, options = {}) =>
  useApi(`tokens/${tokenAddress}`, {
    autoReload: true,
    params: { statsPeriod: options.statsPeriod },
  });

export default useToken;

import useApi from '../../../hooks/use-api';

const useToken = (tokenAddress) => useApi(`tokens/${tokenAddress}`);

export default useToken;

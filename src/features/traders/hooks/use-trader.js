import useApi from '../../../hooks/use-api';

const useTrader = (address) => useApi(`traders/${address}`);

export default useTrader;

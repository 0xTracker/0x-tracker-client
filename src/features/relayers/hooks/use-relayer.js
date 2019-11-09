import useApi from '../../../hooks/use-api';

const useRelayer = slug => useApi(`relayers/${slug}`);

export default useRelayer;

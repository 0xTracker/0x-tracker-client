import useApi from '../../../hooks/use-api';

const useRelayer = slug => useApi(`relayers/${slug}`, { version: 2 });

export default useRelayer;

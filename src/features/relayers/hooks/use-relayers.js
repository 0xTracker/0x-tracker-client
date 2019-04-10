import useApi from '../../../hooks/use-api';

const useRelayers = () => {
  const { error, loading, response } = useApi('relayers');

  return [response, loading, error];
};

export default useRelayers;

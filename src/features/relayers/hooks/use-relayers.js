import useApi from '../../../hooks/use-api';

const useRelayers = () => {
  const { error, loading, response } = useApi('relayers');

  return { data: response, error, loading };
};

export default useRelayers;

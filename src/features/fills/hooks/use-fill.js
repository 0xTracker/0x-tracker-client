import useApi from '../../../hooks/use-api';

const useFill = fillId => {
  const { error, loading, response } = useApi(`fills/${fillId}`, undefined, [
    fillId,
  ]);

  return { data: response, error, loading };
};

export default useFill;

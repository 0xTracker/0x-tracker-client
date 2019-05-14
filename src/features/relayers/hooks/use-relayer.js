import useApi from '../../../hooks/use-api';

const useRelayer = slug => {
  const { error, loading, response } = useApi(
    `relayers/${slug}`,
    { version: 2 },
    [slug],
  );

  return [response, loading, error];
};

export default useRelayer;

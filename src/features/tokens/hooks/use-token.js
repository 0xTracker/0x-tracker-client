import useApi from '../../../hooks/use-api';

const useToken = tokenAddress => {
  const { error, loading, response } = useApi(
    `tokens/${tokenAddress}`,
    undefined,
    [tokenAddress],
  );

  return { data: response, error, loading };
};

export default useToken;

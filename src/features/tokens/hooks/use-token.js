import useApi from '../../../hooks/use-api';

const useToken = tokenAddress => {
  const { error, loading, response } = useApi(
    `tokens/${tokenAddress}`,
    undefined,
    [tokenAddress],
  );

  if (error) {
    throw error;
  }

  return [response, loading];
};

export default useToken;

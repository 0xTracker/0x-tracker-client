import useApi from '../../../hooks/use-api';

const useRates = () => {
  const [rates, loading, error] = useApi('rates', {
    autoReload: false,
  });

  const usdRates = rates === undefined ? undefined : rates.USD;

  return [usdRates, loading, error];
};

export default useRates;

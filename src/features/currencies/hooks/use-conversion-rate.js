import React from 'react';

import { BASE_CURRENCY } from '../constants';
import RatesContext from '../contexts/rates-context';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';

const useConversionRate = () => {
  const rates = React.useContext(RatesContext);
  const displayCurrency = useDisplayCurrency();

  if (displayCurrency === BASE_CURRENCY) {
    return 1;
  }

  if (rates === undefined) {
    return undefined;
  }

  return rates[displayCurrency];
};

export default useConversionRate;

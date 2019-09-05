import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { BASE_CURRENCY, CURRENCIES } from '../constants';
import RatesContext from '../contexts/rates-context';

const RatesProvider = ({ children }) => {
  const [rates, setRates] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const toSymbols = Object.values(CURRENCIES)
      .map(currency => currency.symbol)
      .join(',');

    axios
      .get(
        `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${BASE_CURRENCY}&tsyms=${toSymbols}`,
      )
      .then(response => {
        setRates(response.data[BASE_CURRENCY]);
      })
      .catch(caughtError => {
        setError(caughtError);
      });
  }, []);

  if (error) {
    throw error;
  }

  return (
    <RatesContext.Provider value={rates}>{children}</RatesContext.Provider>
  );
};

RatesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RatesProvider;

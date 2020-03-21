import PropTypes from 'prop-types';
import React from 'react';

import RatesContext from '../contexts/rates-context';
import useFetchRates from '../hooks/use-fetch-rates';

const RatesProvider = ({ children }) => {
  const rates = useFetchRates();

  return (
    <RatesContext.Provider value={rates}>{children}</RatesContext.Provider>
  );
};

RatesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RatesProvider;

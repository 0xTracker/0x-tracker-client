import PropTypes from 'prop-types';
import React from 'react';

import RatesContext from '../contexts/rates-context';
import useRates from '../hooks/use-rates';

const RatesProvider = ({ children }) => {
  const [rates] = useRates();

  return (
    <RatesContext.Provider value={rates}>{children}</RatesContext.Provider>
  );
};

RatesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RatesProvider;

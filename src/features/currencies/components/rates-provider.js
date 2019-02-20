import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { getRates, getConversionRate } from '../selectors';
import RatesContext from '../contexts/rates-context';

const UnconnectedRatesProvider = ({ children, fetchRates, rates }) => {
  useEffect(() => {
    if (rates === undefined) {
      fetchRates();
    }
  }, [rates]);

  return (
    <RatesContext.Provider rates={rates ? rates.data : undefined}>
      {children}
    </RatesContext.Provider>
  );
};

UnconnectedRatesProvider.propTypes = {
  children: PropTypes.node.isRequired,
  fetchRates: PropTypes.func.isRequired,
  rates: PropTypes.object,
};

UnconnectedRatesProvider.defaultProps = {
  rates: undefined,
};

const mapStateToProps = state => ({
  conversionRate: getConversionRate(state),
  rates: getRates(state),
});

const mapDispatchToProps = dispatch => ({
  fetchRates: () => dispatch.rates.fetch(),
});

const RatesProvider = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UnconnectedRatesProvider);

export default RatesProvider;

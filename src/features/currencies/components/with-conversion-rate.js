import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { getDisplayCurrency, getRates, getConversionRate } from '../selectors';

const withConversionRate = WrappedComponent => {
  class WithRatesHoc extends PureComponent {
    componentDidMount() {
      const { conversionRate, fetchRates } = this.props;

      if (conversionRate === undefined) {
        fetchRates();
      }
    }

    componentDidUpdate() {
      const { conversionRate, fetchRates } = this.props;

      if (conversionRate === undefined) {
        fetchRates();
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithRatesHoc.propTypes = {
    conversionRate: PropTypes.number,
    displayCurrency: PropTypes.string.isRequired,
    fetchRates: PropTypes.func.isRequired,
    rates: PropTypes.object, // eslint-disable-line  react/forbid-prop-types
  };

  WithRatesHoc.defaultProps = {
    conversionRate: undefined,
    rates: undefined,
  };

  const mapStateToProps = state => ({
    conversionRate: getConversionRate(state),
    displayCurrency: getDisplayCurrency(state),
    rates: getRates(state),
  });

  const mapDispatchToProps = dispatch => ({
    fetchRates: () =>
      dispatch.rates.fetch(undefined, { debounce: { time: 500 } }),
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(WithRatesHoc);
};

export default withConversionRate;

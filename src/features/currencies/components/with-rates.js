import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import * as currenciesActionCreators from '../actions';

const withRates = WrappedComponent => {
  class WithRatesHoc extends PureComponent {
    componentDidMount() {
      const { fetchRates, rates } = this.props;

      if (rates === null) {
        fetchRates();
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithRatesHoc.propTypes = {
    fetchRates: PropTypes.func.isRequired,
    rates: PropTypes.object,
  };

  WithRatesHoc.defaultProps = {
    rates: undefined,
  };

  const mapStateToProps = state => ({
    rates: state.rates,
  });

  const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(currenciesActionCreators, dispatch),
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(WithRatesHoc);
};

export default withRates;

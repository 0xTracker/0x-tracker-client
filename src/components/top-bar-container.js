import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';

import * as currenciesActionCreators from '../features/currencies/actions';
import * as preferencesActionCreators from '../features/preferences/actions';
import * as statsActionCreators from '../features/stats/actions';
import { TIME_PERIOD } from '../constants';
import { getNetworkStats } from '../features/stats/selectors';
import TopBar from './top-bar';
import withRates from '../features/currencies/components/with-rates';

class TopBarContainer extends PureComponent {
  constructor() {
    super();

    this.handleChangeCurrency = this.handleChangeCurrency.bind(this);
  }

  componentDidMount() {
    const { displayCurrency, fetchNetworkStats, fetchZrxPrice } = this.props;

    fetchNetworkStats(TIME_PERIOD.DAY);
    fetchZrxPrice(displayCurrency);
  }

  componentDidUpdate(prevProps) {
    const {
      autoReloadKey,
      displayCurrency,
      fetchNetworkStats,
      fetchZrxPrice,
    } = this.props;

    if (
      prevProps.autoReloadKey !== autoReloadKey ||
      prevProps.displayCurrency !== displayCurrency
    ) {
      fetchNetworkStats(TIME_PERIOD.DAY);
      fetchZrxPrice(displayCurrency);
    }
  }

  handleChangeCurrency(currency) {
    const { setCurrency } = this.props;

    setCurrency(currency);
  }

  render() {
    const { displayCurrency, networkStats, zrxPrice } = this.props;

    return (
      <TopBar
        displayCurrency={displayCurrency}
        fees={networkStats && networkStats.fees[displayCurrency]}
        onCurrencyChange={this.handleChangeCurrency}
        tradeCount={networkStats && networkStats.trades}
        volume={networkStats && networkStats.volume}
        zrxPrice={zrxPrice}
      />
    );
  }
}

TopBarContainer.propTypes = {
  autoReloadKey: PropTypes.string,
  displayCurrency: PropTypes.string.isRequired,
  fetchNetworkStats: PropTypes.func.isRequired,
  fetchZrxPrice: PropTypes.func.isRequired,
  networkStats: PropTypes.object,
  setCurrency: PropTypes.func.isRequired,
  zrxPrice: PropTypes.object,
};

TopBarContainer.defaultProps = {
  autoReloadKey: undefined,
  networkStats: undefined,
  zrxPrice: undefined,
};

const mapStateToProps = state => ({
  autoReloadKey: state.autoReload.key,
  displayCurrency: state.preferences.currency,
  networkStats: getNetworkStats(state, { period: TIME_PERIOD.DAY }),
  zrxPrice: state.zrxPrice[state.preferences.currency],
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(currenciesActionCreators, dispatch),
  ...bindActionCreators(preferencesActionCreators, dispatch),
  ...bindActionCreators(statsActionCreators, dispatch),
});

const enhance = compose(
  withRates,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);

export default enhance(TopBarContainer);

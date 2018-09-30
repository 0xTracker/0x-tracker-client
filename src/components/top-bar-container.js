import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';

import { TIME_PERIOD } from '../constants';
import { getNetworkStats } from '../features/stats/selectors';
import TopBar from './top-bar';
import withConversionRate from '../features/currencies/components/with-conversion-rate';

class TopBarContainer extends PureComponent {
  constructor() {
    super();

    this.handleChangeCurrency = this.handleChangeCurrency.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { autoReloadKey, displayCurrency } = this.props;
    const autoReload = prevProps.autoReloadKey !== autoReloadKey;

    if (autoReload || prevProps.displayCurrency !== displayCurrency) {
      this.loadData({ loadStats: autoReload });
    }
  }

  loadData(options = { loadStats: true }) {
    const { displayCurrency, fetchNetworkStats, fetchZrxPrice } = this.props;

    if (options.loadStats) {
      fetchNetworkStats({ period: TIME_PERIOD.DAY });
    }

    fetchZrxPrice(displayCurrency);
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
  fetchNetworkStats: dispatch.stats.fetchNetworkStats,
  fetchZrxPrice: dispatch.zrxPrice.fetch,
  setCurrency: dispatch.preferences.setCurrency,
});

const enhance = compose(
  withConversionRate,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);

export default enhance(TopBarContainer);

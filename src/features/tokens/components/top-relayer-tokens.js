import { filter, flow, map, take } from 'lodash/fp';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import { getDisplayCurrency } from '../../currencies/selectors';
import AsyncTopTokensChart from './async-top-tokens-chart';
import AutoReload from '../../../util/auto-reload';
import getTokensWithStats from '../selectors/get-tokens-with-stats';
import LoadingIndicator from '../../../components/loading-indicator';
import tokensPropTypes from '../prop-types';

// TODO: Deprecate this in favor of a markets table on relayer pages
class TopRelayerTokens extends PureComponent {
  componentDidMount() {
    this.loadData();
    AutoReload.addListener(this.loadData);
  }

  componentDidUpdate(prevProps) {
    const { period, relayerId } = this.props;

    if (prevProps.period !== period || prevProps.relayerId !== relayerId) {
      this.loadData();
    }
  }

  componentWillUnmount() {
    AutoReload.removeListener(this.loadData);
  }

  loadData = () => {
    const { fetchTokenStats, fetchTokens, period, relayerId } = this.props;

    fetchTokenStats({ period, relayer: relayerId });
    fetchTokens();
  };

  render() {
    const { displayCurrency, tokens } = this.props;

    if (tokens === undefined) {
      return <LoadingIndicator centered />;
    }

    const data = flow([
      map(token => ({
        share: token.share,
        token,
        tokenVolume: token.volume[token.symbol],
        volume: token.volume[displayCurrency],
      })),
      filter(dataPoint => dataPoint.tokenVolume > 0),
      take(5),
    ])(tokens);

    return (
      <AsyncTopTokensChart data={data} displayCurrency={displayCurrency} />
    );
  }
}

TopRelayerTokens.propTypes = {
  displayCurrency: PropTypes.string.isRequired,
  fetchTokenStats: PropTypes.func.isRequired,
  fetchTokens: PropTypes.func.isRequired,
  period: PropTypes.string.isRequired,
  relayerId: PropTypes.string.isRequired,
  tokens: PropTypes.arrayOf(tokensPropTypes.tokenWithStats),
};

TopRelayerTokens.defaultProps = {
  tokens: undefined,
};

const mapStateToProps = (state, ownProps) => ({
  displayCurrency: getDisplayCurrency(state),
  tokens: getTokensWithStats(state, ownProps),
});

const mapDispatchToProps = dispatch => ({
  fetchTokenStats: dispatch.stats.fetchTokenStats,
  fetchTokens: dispatch.tokens.fetch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopRelayerTokens);

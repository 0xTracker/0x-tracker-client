import _ from 'lodash';
import { filter, flow, map, take } from 'lodash/fp';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import * as statsActionCreators from '../../stats/actions';
import * as tokensActionCreators from '../actions';
import { getDisplayCurrency } from '../../currencies/selectors';
import getTokensWithStats from '../selectors/get-tokens-with-stats';
import LoadingIndicator from '../../../components/loading-indicator';
import tokensPropTypes from '../prop-types';
import TopTokensChart from './top-tokens-chart';

class TopTokens extends PureComponent {
  async componentDidMount() {
    await this.loadData();
  }

  async componentDidUpdate(prevProps) {
    const { autoReloadKey, period, relayerId } = this.props;

    if (
      prevProps.autoReloadKey !== autoReloadKey ||
      prevProps.period !== period ||
      prevProps.relayerId !== relayerId
    ) {
      await this.loadData();
    }
  }

  async loadData() {
    const { fetchTokenStats, fetchTokens, period, relayerId } = this.props;

    await Promise.all([fetchTokenStats(period, { relayerId }), fetchTokens()]);
  }

  render() {
    const { displayCurrency, tokens } = this.props;

    if ([tokens].some(_.isUndefined)) {
      return <LoadingIndicator isCentered />;
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

    return <TopTokensChart data={data} displayCurrency={displayCurrency} />;
  }
}

TopTokens.propTypes = {
  autoReloadKey: PropTypes.string,
  displayCurrency: PropTypes.string.isRequired,
  fetchTokenStats: PropTypes.func.isRequired,
  fetchTokens: PropTypes.func.isRequired,
  period: PropTypes.string.isRequired,
  relayerId: PropTypes.string,
  tokens: PropTypes.arrayOf(tokensPropTypes.tokenWithStats),
};

TopTokens.defaultProps = {
  autoReloadKey: undefined,
  relayerId: undefined,
  tokens: undefined,
};

const mapStateToProps = (state, ownProps) => ({
  autoReloadKey: state.autoReload.key,
  displayCurrency: getDisplayCurrency(state),
  tokens: getTokensWithStats(state, ownProps),
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(statsActionCreators, dispatch),
  ...bindActionCreators(tokensActionCreators, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopTokens);

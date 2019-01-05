import _ from 'lodash';
import { compose } from 'recompose';
import { chunk, get, flow } from 'lodash/fp';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Scroll from 'react-scroll';

import { TIME_PERIOD, URL } from '../../../constants';
import LoadingIndicator from '../../../components/loading-indicator';
import Paginator from '../../../components/paginator';
import prettyPeriod from '../../../util/pretty-period';
import sharedPropTypes from '../../../prop-types';
import tokensPropTypes from '../prop-types';
import getTokensWithStats from '../selectors/get-tokens-with-stats';
import withConversionRate from '../../currencies/components/with-conversion-rate';
import TokenListItem from './token-list-item';

const DEFAULT_PERIOD = TIME_PERIOD.DAY;

class TokenList extends PureComponent {
  constructor() {
    super();

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    const { fetchTokens, fetchTokenStats, period } = this.props;

    fetchTokens();
    fetchTokenStats({ period });
  }

  componentDidUpdate(prevProps) {
    const { autoReloadKey, fetchTokenStats, period } = this.props;

    if (prevProps.autoReloadKey !== autoReloadKey) {
      fetchTokenStats({ period });
    }
  }

  handlePageChange(page) {
    const { history } = this.props;

    history.push(`${URL.TOKENS}?page=${page}`);
    Scroll.animateScroll.scrollToTop({ duration: 500 });
  }

  render() {
    const { limit, page, period, tokens } = this.props;
    const offset = (page - 1) * limit;

    if (_.some([tokens], _.isNil)) {
      return <LoadingIndicator centered />;
    }

    const tokensChunk = flow([chunk(limit), get(page - 1)])(tokens);
    const pageCount = Math.floor(_.size(tokens) / limit);

    return (
      <React.Fragment>
        <table className="table table-responsive">
          <thead>
            <tr>
              <th>#</th>
              <th colSpan="2">Token</th>
              <th css="text-align: right;">Last Price</th>
              <th css="text-align: right;">Trades ({prettyPeriod(period)})</th>
              <th css="text-align: right;">Volume ({prettyPeriod(period)})</th>
            </tr>
          </thead>
          <tbody>
            {_.map(tokensChunk, (token, index) => (
              <TokenListItem
                key={token.address}
                position={index + offset + 1}
                token={token}
              />
            ))}
          </tbody>
        </table>
        <Paginator
          css="margin: 1rem;"
          onPageChange={this.handlePageChange}
          page={page}
          pageCount={pageCount}
        />
      </React.Fragment>
    );
  }
}

TokenList.propTypes = {
  autoReloadKey: PropTypes.string,
  fetchTokenStats: PropTypes.func.isRequired,
  fetchTokens: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  limit: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  period: sharedPropTypes.timePeriod,
  tokens: PropTypes.arrayOf(tokensPropTypes.tokenWithStats),
};

TokenList.defaultProps = {
  autoReloadKey: undefined,
  period: DEFAULT_PERIOD,
  tokens: undefined,
};

const mapDispatchToProps = dispatch => ({
  fetchTokens: dispatch.tokens.fetch,
  fetchTokenStats: dispatch.stats.fetchTokenStats,
});

const mapStateToProps = (state, ownProps) => ({
  autoReloadKey: state.autoReload.key,
  tokens: getTokensWithStats(state, {
    period: ownProps.period || DEFAULT_PERIOD,
  }),
});

const enhance = compose(
  withConversionRate,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);

export default enhance(TokenList);

import _ from 'lodash';
import { compose } from 'recompose';
import { chunk, get, flow } from 'lodash/fp';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { css, StyleSheet } from 'aphrodite';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Scroll from 'react-scroll';

import * as statsActionCreators from '../../stats/actions';
import { BASE_CURRENCY } from '../../currencies/constants';
import { TIME_PERIOD, URL, DATE_FORMAT } from '../../../constants';
import buildFillUrl from '../../fills/util/build-fill-url';
import buildTokenUrl from '../util/build-token-url';
import formatDate from '../../../util/format-date';
import formatToken from '../../../util/format-token';
import LoadingIndicator from '../../../components/loading-indicator';
import LocalisedAmount from '../../currencies/components/localised-amount';
import Paginator from '../../../components/paginator';
import prettyPeriod from '../../../util/pretty-period';
import sharedPropTypes from '../../../prop-types';
import tokensPropTypes from '../prop-types';
import TokenAmount from './token-amount';
import getTokensWithStats from '../selectors/get-tokens-with-stats';
import withConversionRate from '../../currencies/components/with-conversion-rate';

const DEFAULT_PERIOD = TIME_PERIOD.DAY;

const styles = StyleSheet.create({
  lastTrade: {
    color: 'inherit',
    textDecoration: 'none',
  },
});

class TokenList extends PureComponent {
  constructor() {
    super();

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    const { fetchTokens, fetchTokenStats, period } = this.props;

    fetchTokens();
    fetchTokenStats(period);
  }

  componentDidUpdate(prevProps) {
    const { autoReloadKey, fetchTokenStats, period } = this.props;

    if (prevProps.autoReloadKey !== autoReloadKey) {
      fetchTokenStats(period);
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
      return <LoadingIndicator isCentered />;
    }

    const tokensChunk = flow([chunk(limit), get(page - 1)])(tokens);
    const pageCount = Math.floor(_.size(tokens) / limit);

    const getLocalizedAmountLabel = token => {
      if (token.trades === 0) {
        return (
          <React.Fragment>
            None<br />
          </React.Fragment>
        );
      }

      if (token.volume[BASE_CURRENCY] === 0) {
        return null;
      }

      return (
        <React.Fragment>
          <LocalisedAmount amount={token.volume[BASE_CURRENCY]} />
          <br />
        </React.Fragment>
      );
    };

    const getTokenAmountLabel = token => {
      if (token.trades === 0) {
        return <span className="text-muted">None</span>;
      }

      if (token.volume[BASE_CURRENCY] > 0) {
        return (
          <small className="text-muted">
            <TokenAmount amount={token.volume[token.symbol]} token={token} />
          </small>
        );
      }
      return (
        <React.Fragment>
          {formatToken(token.volume[token.symbol])} {token.symbol}
        </React.Fragment>
      );
    };

    return (
      <React.Fragment>
        <table className="table table-responsive">
          <thead>
            <tr>
              <th>#</th>
              <th colSpan="2">Token</th>
              <th className="text-right">Last Price</th>
              <th className="text-right">Trades ({prettyPeriod(period)})</th>
              <th className="text-right">Volume ({prettyPeriod(period)})</th>
            </tr>
          </thead>
          <tbody>
            {_.map(tokensChunk, (token, index) => (
              <tr
                className={classNames({
                  'text-muted': token.trades === 0,
                })}
                key={token.address}
              >
                <td className="align-middle">{`${index + offset + 1}`}</td>
                <td className="align-middle">
                  {_.isString(token.imageUrl) && (
                    <img height="40" src={token.imageUrl} width="40" />
                  )}
                </td>
                <td width="99%">
                  <Link to={buildTokenUrl(token)}>{token.name}</Link>
                  <br />
                  {token.symbol}
                </td>
                <td className="align-middle text-right">
                  {_.has(token, 'price.lastTrade') &&
                  !_.isEmpty(token.price.lastTrade) ? (
                    <Link
                      className={css(styles.lastTrade)}
                      to={buildFillUrl(token.price.lastTrade.id)}
                    >
                      <LocalisedAmount
                        amount={token.price.lastPrice[BASE_CURRENCY]}
                      />
                      <br />
                      <small className="text-muted">
                        {formatDate(
                          token.price.lastTrade.date,
                          DATE_FORMAT.RELATIVE,
                        )}{' '}
                        ago
                      </small>
                    </Link>
                  ) : (
                    '-'
                  )}
                </td>
                <td className="align-middle text-right">{token.trades}</td>
                <td className="align-middle text-right">
                  {getLocalizedAmountLabel(token)}
                  {getTokenAmountLabel(token)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Paginator
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
  ...bindActionCreators(statsActionCreators, dispatch),
  fetchTokens: dispatch.tokens.fetch,
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

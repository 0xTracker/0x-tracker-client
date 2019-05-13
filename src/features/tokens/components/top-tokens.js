import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getDisplayCurrency } from '../../currencies/selectors';
import AsyncTopTokensChart from './async-top-tokens-chart';
import LoadingIndicator from '../../../components/loading-indicator';
import TokensLoader from './tokens-loader';
import normalizePeriod from '../../../util/normalize-period';

const getDataPointsForPeriod = (tokens, period) => {
  const normalizedPeriod = normalizePeriod(period);

  return tokens.map(token => ({
    share: _.get(token, `stats.${normalizedPeriod}.volumeShare`, 0),
    token,
    tokenVolume: _.get(token, `stats.${normalizedPeriod}.volume.token`, '0'),
    volume: _.get(token, `stats.${normalizedPeriod}.volume.USD`, 0),
  }));
};

const TopTokens = ({ displayCurrency, period }) => (
  <TokensLoader
    limit={5}
    page={1}
    sortBy={`${normalizePeriod(period)}-volume-share`}
  >
    {({ loading, tokens }) =>
      loading ? (
        <LoadingIndicator centered />
      ) : (
        <AsyncTopTokensChart
          data={getDataPointsForPeriod(tokens, period)}
          displayCurrency={displayCurrency}
        />
      )
    }
  </TokensLoader>
);

TopTokens.propTypes = {
  displayCurrency: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  displayCurrency: getDisplayCurrency(state),
});

export default connect(mapStateToProps)(TopTokens);

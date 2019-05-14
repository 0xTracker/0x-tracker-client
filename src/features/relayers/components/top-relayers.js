import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getDisplayCurrency } from '../../currencies/selectors';
import AsyncTopRelayersChart from './async-top-relayers-chart';
import LoadingIndicator from '../../../components/loading-indicator';
import normalizePeriod from '../../../util/normalize-period';
import useRelayers from '../hooks/use-relayers';

const getDataPointsForPeriod = (relayers, period) => {
  const normalizedPeriod = normalizePeriod(period);

  return relayers.map(relayer => ({
    relayer,
    trades: _.get(relayer, `stats.${normalizedPeriod}.trades`, 0),
    volume: _.get(relayer, `stats.${normalizedPeriod}.volume`, 0),
    volumeShare: _.get(relayer, `stats.${normalizedPeriod}.volumeShare`, 0),
  }));
};

const TopRelayers = ({ displayCurrency, period }) => {
  const [relayers, loadingRelayers, relayersError] = useRelayers({ limit: 5 });

  if (loadingRelayers) {
    return <LoadingIndicator centered />;
  }

  if (relayersError) {
    throw relayersError;
  }

  return (
    <AsyncTopRelayersChart
      data={getDataPointsForPeriod(relayers.items, period)}
      displayCurrency={displayCurrency}
    />
  );
};

TopRelayers.propTypes = {
  displayCurrency: PropTypes.string.isRequired,
  period: PropTypes.string,
};

TopRelayers.defaultProps = {
  period: undefined,
};

const mapStateToProps = state => ({
  displayCurrency: getDisplayCurrency(state),
});

export default connect(mapStateToProps)(TopRelayers);

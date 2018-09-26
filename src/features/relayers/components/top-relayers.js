import { filter, flow, sortBy, takeLast } from 'lodash/fp';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { BASE_CURRENCY } from '../../currencies/constants';
import { getDisplayCurrency } from '../../currencies/selectors';
import getRelayersWithStats from '../selectors/get-relayers-with-stats';
import LoadingIndicator from '../../../components/loading-indicator';
import relayerPropTypes from '../prop-types';
import TopRelayersChart from './top-relayers-chart';
import withRelayerStats from '../../stats/components/with-relayer-stats';
import withRelayers from './with-relayers';

const TopRelayers = ({ displayCurrency, relayers }) => {
  if (relayers === undefined) {
    return <LoadingIndicator isCentered />;
  }

  const topRelayers = flow([
    filter(relayer => relayer.stats.volume[BASE_CURRENCY] > 0),
    sortBy('stats.share'),
    takeLast(5),
  ])(relayers);

  return (
    <TopRelayersChart
      displayCurrency={displayCurrency}
      relayers={topRelayers}
    />
  );
};

TopRelayers.propTypes = {
  displayCurrency: PropTypes.string.isRequired,
  relayers: PropTypes.arrayOf(relayerPropTypes.relayerWithStats),
};

TopRelayers.defaultProps = {
  relayers: undefined,
};

const mapStateToProps = (state, ownProps) => ({
  displayCurrency: getDisplayCurrency(state),
  relayers: getRelayersWithStats(state, ownProps),
});

const enhance = compose(
  withRelayers,
  withRelayerStats,
  connect(mapStateToProps),
);

export default enhance(TopRelayers);

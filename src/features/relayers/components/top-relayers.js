import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import AsyncTopRelayersChart from './async-top-relayers-chart';
import LoadingIndicator from '../../../components/loading-indicator';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';
import useRelayers from '../hooks/use-relayers';

const TopRelayers = ({ period }) => {
  const displayCurrency = useDisplayCurrency();
  const [relayers, loadingRelayers] = useRelayers({
    autoReload: true,
    limit: 5,
    statsPeriod: period,
  });

  if (loadingRelayers) {
    return <LoadingIndicator centered />;
  }

  return (
    <AsyncTopRelayersChart
      data={_.reverse(relayers.items).map(relayer => ({
        relayer,
        trades: _.get(relayer, 'stats.tradeCount', 0),
        volume: _.get(relayer, 'stats.tradeVolume', 0),
        volumeShare: _.get(relayer, 'stats.tradeVolumeShare', 0),
      }))}
      displayCurrency={displayCurrency}
    />
  );
};

TopRelayers.propTypes = {
  period: PropTypes.string,
};

TopRelayers.defaultProps = {
  period: undefined,
};

export default TopRelayers;

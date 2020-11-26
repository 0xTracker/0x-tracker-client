import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import LoadingIndicator from '../../../components/loading-indicator';
import sharedPropTypes from '../../../prop-types';
import TopProtocolsChart from './top-protocols-chart';
import useProtocols from '../hooks/use-protocols';

const TopProtocols = ({ period, sortBy }) => {
  const [protocols, loading] = useProtocols({
    limit: 10,
    page: 1,
    sortBy,
    statsPeriod: period,
  });

  if (loading) {
    return <LoadingIndicator centered />;
  }

  const stats = _.sortBy(
    protocols.items.map((protocol) => ({
      protocolVersion: protocol.version,
      tradeCount: protocol.stats.tradeCount,
      tradeVolume: protocol.stats.tradeVolume,
    })),
    'protocolVersion',
  );

  return <TopProtocolsChart data={stats} sortBy={sortBy} />;
};

TopProtocols.propTypes = {
  period: sharedPropTypes.timePeriod.isRequired,
  sortBy: PropTypes.string.isRequired,
};

export default TopProtocols;

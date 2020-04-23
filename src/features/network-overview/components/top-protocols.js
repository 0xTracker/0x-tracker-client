import _ from 'lodash';
import React from 'react';

import AsyncTopProtocolsChart from './async-top-protocols-chart';
import LoadingIndicator from '../../../components/loading-indicator';
import sharedPropTypes from '../../../prop-types';
import useProtocols from '../hooks/use-protocols';

const TopProtocols = ({ period }) => {
  const [protocols, loading] = useProtocols({
    limit: 3,
    page: 1,
    sortBy: 'fillCount',
    statsPeriod: period,
  });

  if (loading) {
    return <LoadingIndicator centered />;
  }

  const stats = _.sortBy(
    protocols.items.map((protocol) => ({
      fillCount: protocol.stats.fillCount,
      protocolVersion: protocol.version,
      tradeVolume: protocol.stats.tradeVolume,
    })),
    'protocolVersion',
  );

  return <AsyncTopProtocolsChart data={stats} />;
};

TopProtocols.propTypes = {
  period: sharedPropTypes.timePeriod.isRequired,
};

export default TopProtocols;

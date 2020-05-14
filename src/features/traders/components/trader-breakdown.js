import React from 'react';

import LoadingIndicator from '../../../components/loading-indicator';
import sharedPropTypes from '../../../prop-types';
import TraderBreakdownChart from './trader-breakdown-chart';
import useTraderStats from '../../stats/hooks/use-trader-stats';

const TraderBreakdown = ({ period }) => {
  const [traderStats, loading] = useTraderStats({ period });

  if (loading) {
    return <LoadingIndicator centered />;
  }
  const stats = [
    {
      count: traderStats.makerCount,
      traderType: 'maker',
    },
    {
      count: traderStats.takerCount,
      traderType: 'taker',
    },
  ];

  return <TraderBreakdownChart data={stats} />;
};

TraderBreakdown.propTypes = {
  period: sharedPropTypes.timePeriod,
};

TraderBreakdown.defaultProps = {
  period: undefined,
};

export default TraderBreakdown;

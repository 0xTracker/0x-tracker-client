import React from 'react';

import AsyncTraderBreakdownChart from './async-trader-breakdown-chart';
import LoadingIndicator from '../../../components/loading-indicator';
import sharedPropTypes from '../../../prop-types';
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

  return <AsyncTraderBreakdownChart data={stats} />;
};

TraderBreakdown.propTypes = {
  period: sharedPropTypes.timePeriod,
};

TraderBreakdown.defaultProps = {
  period: undefined,
};

export default TraderBreakdown;

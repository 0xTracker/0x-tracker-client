import React from 'react';

import AsyncTraderBreakdownChart from './async-trader-breakdown-chart';

const TraderBreakdown = () => {
  const stats = [
    {
      count: 328,
      traderType: 'maker',
    },
    {
      count: 542,
      traderType: 'taker',
    },
  ];

  return <AsyncTraderBreakdownChart data={stats} />;
};

export default TraderBreakdown;

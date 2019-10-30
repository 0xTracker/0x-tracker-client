import React from 'react';

import AsyncTopProtocolsChart from './async-top-protocols-chart';

const TopProtocols = () => {
  const stats = [
    {
      protocolVersion: 2,
      share: 79.4,
      tradeCount: 573,
      tradeVolume: 5000000,
    },
    {
      protocolVersion: 2.1,
      share: 19,
      tradeCount: 333,
      tradeVolume: 1200000,
    },
    { protocolVersion: 1, share: 1.6, tradeCount: 120, tradeVolume: 100000 },
  ];

  return <AsyncTopProtocolsChart data={stats} />;
};

export default TopProtocols;

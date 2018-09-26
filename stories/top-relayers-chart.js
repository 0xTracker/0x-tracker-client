import { storiesOf } from '@storybook/react';
import React from 'react';

import TopRelayersChart from '../src/features/relayers/components/top-relayers-chart';

storiesOf('Charts|TopRelayersChart', module).addWithJSX('default', () => {
  const data = [
    { name: 'Radar Relay', share: 60, trades: 512, volume: 120000 },
    { name: 'Paradex', share: 30, trades: 210, volume: 48000 },
    { name: 'ERC dEX', share: 10, trades: 100, volume: 10000 },
  ];

  return <TopRelayersChart data={data} displayCurrency="USD" />;
});

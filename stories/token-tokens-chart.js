import { storiesOf } from '@storybook/react';
import React from 'react';

import TopTokensChart from '../src/features/tokens/components/top-tokens-chart';

storiesOf('Charts|TopTokensChart', module).addWithJSX('default', () => {
  const data = [
    {
      name: 'Wrapped Ether',
      symbol: 'ETH',
      volume: 1500,
      tokenVolume: '50',
      share: 50,
    },
    {
      name: 'Dai Stablecoin',
      symbol: 'DAI',
      volume: 750,
      tokenVolume: '750',
      share: 25,
    },
    {
      name: 'HelloGold Token',
      symbol: 'HGT',
      volume: 300,
      tokenVolume: '10',
      share: 10,
    },
    {
      name: '0x Protocol Token',
      symbol: 'ZRX',
      volume: 300,
      tokenVolume: '420',
      share: 10,
    },
    {
      name: 'Maker',
      symbol: 'MKR',
      volume: 150,
      tokenVolume: '35',
      share: 5,
    },
  ];

  return <TopTokensChart data={data} displayCurrency="GBP" />;
});

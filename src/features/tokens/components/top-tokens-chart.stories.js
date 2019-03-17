import { storiesOf } from '@storybook/react';
import React from 'react';

import TopTokensChart from './top-tokens-chart';

storiesOf('Charts|TopTokensChart', module)
  .addDecorator(getStory => (
    <div css="width: 600px; height: 300px;">{getStory()}</div>
  ))
  .add('default', () => {
    const data = [
      {
        share: 50,
        token: { name: 'Wrapped Ether', symbol: 'ETH' },
        tokenVolume: '50',
        volume: 1500,
      },
      {
        share: 25,
        token: { name: 'Dai Stablecoin', symbol: 'DAI' },
        tokenVolume: '750',
        volume: 750,
      },
      {
        share: 10,
        token: { name: 'HelloGold Token', symbol: 'HGT' },
        tokenVolume: '10',
        volume: 300,
      },
      {
        share: 10,
        token: { name: '0x Protocol Token', symbol: 'ZRX' },
        tokenVolume: '420',
        volume: 300,
      },
      {
        share: 5,
        token: { name: 'Maker', symbol: 'MKR' },
        tokenVolume: '35',
        volume: 150,
      },
    ];

    return <TopTokensChart data={data} displayCurrency="GBP" />;
  });

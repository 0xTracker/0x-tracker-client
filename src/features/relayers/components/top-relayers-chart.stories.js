import { storiesOf } from '@storybook/react';
import React from 'react';

import TopRelayersChart from './top-relayers-chart';

storiesOf('Charts|TopRelayersChart', module)
  .addDecorator(getStory => (
    <div css="width: 600px; height: 300px;">{getStory()}</div>
  ))
  .add('default', () => {
    const data = [
      {
        relayer: {
          name: 'Radar Relay',
        },
        trades: 512,
        volume: 120000,
        volumeShare: 60,
      },
      {
        relayer: {
          name: 'Paradex',
        },
        trades: 210,
        volume: 48000,
        volumeShare: 30,
      },
      {
        relayer: {
          name: 'ERC dEX',
        },
        trades: 100,
        volume: 10000,
        volumeShare: 10,
      },
    ];

    return <TopRelayersChart data={data} displayCurrency="USD" />;
  });

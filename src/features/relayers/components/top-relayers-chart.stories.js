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
        name: 'Radar Relay',
        stats: { share: 60, trades: 512, volume: { USD: 120000 } },
      },
      {
        name: 'Paradex',
        stats: { share: 30, trades: 210, volume: { USD: 48000 } },
      },
      {
        name: 'ERC dEX',
        stats: { share: 10, trades: 100, volume: { USD: 10000 } },
      },
    ];

    return <TopRelayersChart displayCurrency="USD" relayers={data} />;
  });

import { storiesOf } from '@storybook/react';
import React from 'react';

import { TIME_PERIOD } from '../src/constants';
import RelayerList from '../src/features/relayers/components/relayer-list';
import ReduxContext from '../src/components/redux-context';

storiesOf('Relayers|RelayerList', module).addWithJSX('default', () => (
  <ReduxContext>
    <RelayerList
      relayers={[
        {
          name: 'Radar Relay',
          slug: 'radar-relay',
          stats: {
            trades: 512,
            volume: { USD: 100000 },
          },
          url: 'https://radarrelay.com',
        },
        {
          name: 'DDEX',
          slug: 'ddex',
          stats: {
            trades: 256,
            volume: { USD: 150456.56 },
          },
          url: 'https://ddex.io',
        },
        {
          name: 'Paradex',
          slug: 'paradex',
          stats: {
            trades: 345,
            volume: { USD: 124000 },
          },
          url: 'https://paradex.io',
        },
        {
          name: 'Sad Relayer',
          slug: 'sad-relayer',
          stats: {
            trades: 0,
            volume: { USD: 0 },
          },
          url: 'https://google.com',
        },
      ]}
      timePeriod={TIME_PERIOD.DAY}
    />
  </ReduxContext>
));

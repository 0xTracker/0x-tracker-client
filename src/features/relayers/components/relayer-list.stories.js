import { storiesOf } from '@storybook/react';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import RelayerList from './relayer-list';
import ReduxContext from '../../../components/redux-context';

storiesOf('Relayers|RelayerList', module).add('default', () => (
  <ReduxContext>
    <RelayerList
      relayers={[
        {
          imageUrl: 'https://0xtracker.com/assets/logos/radar-relay.png',
          name: 'Radar Relay',
          slug: 'radar-relay',
          stats: {
            trades: 512,
            volume: { USD: 100000 },
          },
          url: 'https://radarrelay.com',
        },
        {
          imageUrl: 'https://0xtracker.com/assets/logos/ddex.png',
          name: 'DDEX',
          slug: 'ddex',
          stats: {
            trades: 256,
            volume: { USD: 150456.56 },
          },
          url: 'https://ddex.io',
        },
        {
          imageUrl: 'https://0xtracker.com/assets/logos/paradex.png',
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

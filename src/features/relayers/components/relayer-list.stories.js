import { storiesOf } from '@storybook/react';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import RelayerList from './relayer-list';

storiesOf('Relayers|RelayerList', module).add('default', () => (
  <RelayerList
    relayers={[
      {
        id: 'radarRelay',
        imageUrl: 'https://0xtracker.com/assets/logos/radar-relay.png',
        name: 'Radar Relay',
        slug: 'radar-relay',
        stats: {
          '24h': {
            trades: 512,
            volume: 100000,
          },
        },
        url: 'https://radarrelay.com',
      },
      {
        id: 'ddex',
        imageUrl: 'https://0xtracker.com/assets/logos/ddex.png',
        name: 'DDEX',
        slug: 'ddex',
        stats: {
          '24h': {
            trades: 256,
            volume: 150456.56,
          },
        },
        url: 'https://ddex.io',
      },
      {
        id: 'paradex',
        imageUrl: 'https://0xtracker.com/assets/logos/paradex.png',
        name: 'Paradex',
        slug: 'paradex',
        stats: {
          '24h': {
            trades: 345,
            volume: 124000,
          },
        },
        url: 'https://paradex.io',
      },
    ]}
    timePeriod={TIME_PERIOD.DAY}
  />
));

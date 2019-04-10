import React from 'react';

import { renderWithAppContext } from '../../../test-util/react';
import { TIME_PERIOD } from '../../../constants';
import RelayerList from './relayer-list';

const basicProps = {
  relayers: [
    {
      id: 'radarRelay',
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
    {
      id: 'sadRelayer',
      name: 'Sad Relayer',
      slug: 'sad-relayer',
      stats: {
        '24h': {
          trades: 0,
          volume: 0,
        },
      },
      url: 'https://google.com',
    },
  ],
  timePeriod: TIME_PERIOD.DAY,
};

it('renders with basic props', () => {
  const { container } = renderWithAppContext(<RelayerList {...basicProps} />);

  expect(container.firstChild).toMatchSnapshot();
});

it('renders for one month time period', () => {
  const { getByText } = renderWithAppContext(
    <RelayerList {...basicProps} timePeriod={TIME_PERIOD.MONTH} />,
  );

  getByText('Volume (1M)');
});

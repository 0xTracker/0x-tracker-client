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
        share: 50,
        trades: 512,
        volume: { USD: 100000 },
      },
      url: 'https://radarrelay.com',
    },
    {
      id: 'ddex',
      name: 'DDEX',
      slug: 'ddex',
      stats: {
        share: 40,
        trades: 256,
        volume: { USD: 150456.56 },
      },
      url: 'https://ddex.io',
    },
    {
      id: 'paradex',
      name: 'Paradex',
      slug: 'paradex',
      stats: {
        share: 10,
        trades: 345,
        volume: { USD: 124000 },
      },
      url: 'https://paradex.io',
    },
    {
      id: 'sadRelayer',
      name: 'Sad Relayer',
      slug: 'sad-relayer',
      stats: {
        share: 0,
        trades: 0,
        volume: { USD: 0 },
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

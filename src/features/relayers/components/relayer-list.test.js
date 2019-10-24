import React from 'react';

import { renderWithRouter } from '../../../test-util/react';
import RelayerList from './relayer-list';

const basicProps = {
  relayers: [
    {
      id: 'ddex',
      name: 'DDEX',
      slug: 'ddex',
      stats: {
        tradeCount: 256,
        tradeVolume: 150456.56,
      },
      url: 'https://ddex.io',
    },
    {
      id: 'paradex',
      name: 'Paradex',
      slug: 'paradex',
      stats: {
        tradeCount: 345,
        tradeVolume: 124000,
      },
      url: 'https://paradex.io',
    },
    {
      id: 'radarRelay',
      name: 'Radar Relay',
      slug: 'radar-relay',
      stats: {
        tradeCount: 512,
        tradeVolume: 100000,
      },
      url: 'https://radarrelay.com',
    },
  ],
};

it('renders with basic props', () => {
  const { container } = renderWithRouter(<RelayerList {...basicProps} />);

  expect(container.firstChild).toMatchSnapshot();
});

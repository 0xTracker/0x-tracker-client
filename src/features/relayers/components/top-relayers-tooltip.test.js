import { render } from 'react-testing-library';
import React from 'react';

import TopRelayersTooltip from './top-relayers-tooltip';

const simpleProps = {
  currency: 'USD',
};

it('should render null without payload', () => {
  const { container } = render(<TopRelayersTooltip {...simpleProps} />);

  expect(container.firstChild).toBeNull();
});

it('should render null with empty payload', () => {
  const { container } = render(
    <TopRelayersTooltip {...simpleProps} payload={[]} />,
  );

  expect(container.firstChild).toBeNull();
});

it('should render with payload', () => {
  const { container } = render(
    <TopRelayersTooltip
      {...simpleProps}
      payload={[
        {
          payload: {
            relayer: { name: 'Radar Relay' },
            share: 22.5,
            trades: 50,
            volume: { USD: 540600 },
          },
        },
      ]}
    />,
  );

  expect(container.firstChild).toMatchSnapshot();
});

it('should render for ETH currency', () => {
  const { container } = render(
    <TopRelayersTooltip
      currency="ETH"
      payload={[
        {
          payload: {
            relayer: { name: 'Radar Relay' },
            share: 50,
            trades: 50,
            volume: { ETH: 540600 },
          },
        },
      ]}
    />,
  );

  expect(container.firstChild).toMatchSnapshot();
});

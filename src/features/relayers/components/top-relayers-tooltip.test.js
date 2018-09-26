import { render } from 'react-testing-library';
import React from 'react';

import TopRelayersTooltip from './top-relayers-tooltip';

it('should render null without payload', () => {
  const { container } = render(<TopRelayersTooltip />);

  expect(container.firstChild).toBeNull();
});

it('should render null with empty payload', () => {
  const { container } = render(<TopRelayersTooltip payload={[]} />);

  expect(container.firstChild).toBeNull();
});

it('should render with payload', () => {
  const { container } = render(
    <TopRelayersTooltip
      currency="USD"
      payload={[
        {
          payload: {
            relayer: { name: 'Radar Relay' },
            share: 22.5,
            trades: 50,
            volume: 540600,
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
            volume: 540600,
          },
        },
      ]}
    />,
  );

  expect(container.firstChild).toMatchSnapshot();
});

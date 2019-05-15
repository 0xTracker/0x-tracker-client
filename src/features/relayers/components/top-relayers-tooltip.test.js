import React from 'react';

import { renderWithAppContext } from '../../../test-util/react';
import TopRelayersTooltip from './top-relayers-tooltip';

const simpleProps = {
  currency: 'USD',
};

it('should render null without payload', () => {
  const { container } = renderWithAppContext(
    <TopRelayersTooltip {...simpleProps} />,
  );

  expect(container.firstChild).toBeNull();
});

it('should render null with empty payload', () => {
  const { container } = renderWithAppContext(
    <TopRelayersTooltip {...simpleProps} payload={[]} />,
  );

  expect(container.firstChild).toBeNull();
});

it('should render with payload', () => {
  const { container } = renderWithAppContext(
    <TopRelayersTooltip
      {...simpleProps}
      payload={[
        {
          payload: {
            relayer: { name: 'Radar Relay' },
            trades: 50,
            volume: 540600,
            volumeShare: 22.5,
          },
        },
      ]}
    />,
  );

  expect(container.firstChild).toMatchSnapshot();
});

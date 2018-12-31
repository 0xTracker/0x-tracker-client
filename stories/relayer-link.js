import { storiesOf } from '@storybook/react';
import React from 'react';

import RelayerLink from '../src/features/relayers/components/relayer-link';

storiesOf('Relayers|RelayerLink', module).addWithJSX('default', () => (
  <RelayerLink
    relayer={{
      name: 'Radar Relay',
      slug: 'radar-relay',
      url: 'https://radarrelay.com',
    }}
  >
    Radar Relay
  </RelayerLink>
));

import { storiesOf } from '@storybook/react';
import React from 'react';

import RelayerLink from './relayer-link';

storiesOf('Relayers|RelayerLink', module).add('default', () => (
  <RelayerLink relayer="radar-relay">Radar Relay</RelayerLink>
));

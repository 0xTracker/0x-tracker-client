import { storiesOf } from '@storybook/react';
import React from 'react';

import AppLayout from './app-layout';

storiesOf('Layout|AppLayout', module).add('default', () => (
  <AppLayout>
    <p>Hello World</p>
  </AppLayout>
));

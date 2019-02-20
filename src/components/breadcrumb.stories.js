import { storiesOf } from '@storybook/react';
import React from 'react';

import Breadcrumb from './breadcrumb';

storiesOf('Layout|Breadcrumb', module).add('default', () => (
  <Breadcrumb
    items={[
      { title: 'Tokens', url: '/tokens' },
      { title: 'Basic Attention Token', url: '/tokens/bat' },
    ]}
  />
));

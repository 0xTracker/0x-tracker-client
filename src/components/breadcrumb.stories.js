import { storiesOf } from '@storybook/react';
import React from 'react';

import Breadcrumb from './breadcrumb';

storiesOf('Layout|Breadcrumb', module).add('default', () => (
  <Breadcrumb
    items={[
      { url: '/tokens', title: 'Tokens' },
      { url: '/tokens/bat', title: 'Basic Attention Token' },
    ]}
  />
));

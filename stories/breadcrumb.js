import { storiesOf } from '@storybook/react';
import React from 'react';

import Breadcrumb from '../src/components/breadcrumb';

storiesOf('Layout|Breadcrumb', module).addWithJSX('default', () => (
  <Breadcrumb
    items={[
      { url: '/tokens', title: 'Tokens' },
      { url: '/tokens/bat', title: 'Basic Attention Token' },
    ]}
  />
));

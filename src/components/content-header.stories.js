import { storiesOf } from '@storybook/react';
import React from 'react';

import ContentHeader from './content-header';

const simpleProps = {
  breadcrumbItems: [
    { title: 'Tokens', url: '/tokens' },
    { title: 'Basic Attention Token', url: '/tokens/bat' },
  ],
  title: 'Basic Attention Token',
};

storiesOf('Layout|ContentHeader', module).add('default', () => (
  <ContentHeader {...simpleProps} />
));

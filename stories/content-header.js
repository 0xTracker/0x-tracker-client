import { storiesOf } from '@storybook/react';
import React from 'react';

import ContentHeader from '../src/components/content-header';

const simpleProps = {
  breadcrumbItems: [
    { url: '/tokens', title: 'Tokens' },
    { url: '/tokens/bat', title: 'Basic Attention Token' },
  ],
  title: 'Basic Attention Token',
};

storiesOf('Layout|ContentHeader', module).addWithJSX('default', () => (
  <ContentHeader {...simpleProps} />
));

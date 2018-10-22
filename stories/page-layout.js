import { storiesOf } from '@storybook/react';
import React from 'react';

import PageLayout from '../src/components/page-layout';

const simpleProps = {
  breadcrumbItems: [
    { title: 'Tokens', url: '/tokens' },
    { title: 'DAI Stablecoin', url: '/tokens/0x982739812734' },
  ],
  subTitle: 'DAI',
  title: 'DAI Stablecoin',
};

storiesOf('Layout|PageLayout', module).addWithJSX('default', () => (
  <PageLayout {...simpleProps}>
    <p>Hello World</p>
  </PageLayout>
));

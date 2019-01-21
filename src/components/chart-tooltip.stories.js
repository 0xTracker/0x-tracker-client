import { storiesOf } from '@storybook/react';
import React from 'react';

import ChartTooltip from './chart-tooltip';

storiesOf('Charts|ChartTooltip', module).add('default', () => (
  <div css="width: 300px;">
    <ChartTooltip
      items={[
        { label: 'volume', value: '$15,000' },
        { label: 'change', value: '24%' },
      ]}
      title="Ethereum"
    />
  </div>
));

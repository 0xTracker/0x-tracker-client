import { storiesOf } from '@storybook/react';
import React from 'react';

import ChartTooltip from '../src/components/chart-tooltip';

storiesOf('Charts|ChartTooltip', module).addWithJSX('default', () => (
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

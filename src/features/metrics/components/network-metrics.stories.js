import { storiesOf } from '@storybook/react';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import NetworkMetrics from './network-metrics';

storiesOf('Charts|NetworkMetrics', module)
  .addDecorator(getStory => (
    <div css="width: 600px; height: 300px;">{getStory()}</div>
  ))
  .add('fill volume (default)', () => (
    <NetworkMetrics period={TIME_PERIOD.YEAR} />
  ))
  .add('fill count', () => (
    <NetworkMetrics period={TIME_PERIOD.YEAR} type="fillCount" />
  ))
  .add('trade volume', () => (
    <NetworkMetrics period={TIME_PERIOD.YEAR} type="tradeVolume" />
  ))
  .add('trade count', () => (
    <NetworkMetrics period={TIME_PERIOD.YEAR} type="tradeCount" />
  ))
  .add('protocol fees', () => (
    <NetworkMetrics period={TIME_PERIOD.YEAR} type="protocolFees" />
  ));

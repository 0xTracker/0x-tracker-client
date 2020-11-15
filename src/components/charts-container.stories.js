import { storiesOf } from '@storybook/react';
import React from 'react';

import ChartsContainer from './charts-container';
import TopApps from '../features/apps/components/top-apps';
import TopTokens from '../features/tokens/components/top-tokens';

storiesOf('Layout/ChartsContainer', module)
  .addDecorator((getStory) => (
    <div css="padding: 20px; max-width: 680px;">{getStory()}</div>
  ))
  .add('default', () => (
    <ChartsContainer
      charts={[{ component: TopApps, title: 'Top Apps' }]}
      defaultPeriod="week"
      periods={[
        { label: '24H', value: 'day' },
        { label: '7D', value: 'week' },
        { label: '1M', value: 'month' },
      ]}
    />
  ))
  .add('with multiple charts', () => (
    <ChartsContainer
      charts={[
        { component: TopApps, title: 'Top Apps' },
        { component: TopTokens, title: 'Top Tokens' },
      ]}
      defaultPeriod="month"
      periods={[
        { label: '24H', value: 'day' },
        { label: '7D', value: 'week' },
        { label: '1M', value: 'month' },
      ]}
    />
  ));

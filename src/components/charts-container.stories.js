import { storiesOf } from '@storybook/react';
import React from 'react';

import ChartsContainer from './charts-container';
import TopRelayers from '../features/relayers/components/top-relayers';
import TopTokens from '../features/tokens/components/top-tokens';

storiesOf('Layout|ChartsContainer', module)
  .addDecorator((getStory) => (
    <div css="padding: 20px; max-width: 680px;">{getStory()}</div>
  ))
  .add('default', () => (
    <ChartsContainer
      charts={[{ component: TopRelayers, title: 'Top Relayers' }]}
    />
  ))
  .add('with multiple charts', () => (
    <ChartsContainer
      charts={[
        { component: TopRelayers, title: 'Top Relayers' },
        { component: TopTokens, title: 'Top Tokens' },
      ]}
    />
  ))
  .add('with time periods', () => (
    <ChartsContainer
      charts={[{ component: TopRelayers, title: 'Top Relayers' }]}
      defaultPeriod="week"
      periods={[
        { label: '24H', value: 'day' },
        { label: '7D', value: 'week' },
        { label: '1M', value: 'month' },
      ]}
    />
  ))
  .add('with multiple charts & time periods', () => (
    <ChartsContainer
      charts={[
        { component: TopRelayers, title: 'Top Relayers' },
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

import _ from 'lodash';
import { storiesOf } from '@storybook/react';
import React from 'react';
import subDays from 'date-fns/subDays';

import { TIME_PERIOD } from '../../../constants';
import NetworkMetricsChart from './network-metrics-chart';

storiesOf('Charts|NetworkMetricsChart', module)
  .addDecorator(getStory => (
    <div css="width: 600px; height: 300px;">{getStory()}</div>
  ))
  .add('default', () => {
    const currentDate = new Date();

    const data = _.times(31, index => {
      const date = subDays(currentDate, index);
      date.setUTCHours(0, 0, 0, 0);

      return {
        date,
        fillCount: _.random(1, 100),
        fillVolume: _.random(1000, 5000),
        tradeCount: _.random(100, 200),
        tradeVolume: _.random(5000, 10000),
      };
    });

    return <NetworkMetricsChart data={data} period={TIME_PERIOD.MONTH} />;
  })
  .add('without any data', () => (
    <NetworkMetricsChart data={[]} period={TIME_PERIOD.MONTH} />
  ));

import _ from 'lodash';
import { storiesOf } from '@storybook/react';
import React from 'react';
import subDays from 'date-fns/subDays';

import { TIME_PERIOD } from '../../../constants';
import TokenMetricsChart from './token-metrics-chart';

storiesOf('Charts|TokenMetricsChart', module)
  .addDecorator((getStory) => (
    <div css="width: 600px; height: 300px;">{getStory()}</div>
  ))
  .add('default', () => {
    const currentDate = new Date();

    const data = _.times(31, (index) => {
      const date = subDays(currentDate, index);
      date.setUTCHours(0, 0, 0, 0);

      return {
        date,
        tradeCount: _.random(7, 300),
        tradeVolume: { USD: _.random(1000, 5000), token: _.random(1, 100) },
      };
    });

    return (
      <TokenMetricsChart
        data={data}
        localCurrency="USD"
        period={TIME_PERIOD.MONTH}
        tokenSymbol="DAI"
      />
    );
  })
  .add('without any data', () => (
    <TokenMetricsChart
      data={[]}
      localCurrency="USD"
      period={TIME_PERIOD.MONTH}
      tokenSymbol="DAI"
    />
  ));

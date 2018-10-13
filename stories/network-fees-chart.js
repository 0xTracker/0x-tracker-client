import _ from 'lodash';
import { subDays } from 'date-fns';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { TIME_PERIOD } from '../src/constants';
import NetworkFeesChart from '../src/features/metrics/components/network-fees-chart';

storiesOf('Charts|NetworkFeesChart', module).addWithJSX('default', () => {
  const currentDate = new Date();

  const data = _.times(31, index => {
    const date = subDays(currentDate, index);
    date.setUTCHours(0, 0, 0, 0);

    return {
      date,
      fees: _.random(1, 100),
      localizedFees: _.random(1000, 5000),
    };
  });

  return (
    <NetworkFeesChart
      data={data}
      displayCurrency="USD"
      period={TIME_PERIOD.MONTH}
    />
  );
});

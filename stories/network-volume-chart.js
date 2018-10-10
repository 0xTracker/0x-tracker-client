import _ from 'lodash';
import { storiesOf } from '@storybook/react';
import { subDays } from 'date-fns';
import React from 'react';

import { TIME_PERIOD } from '../src/constants';
import NetworkVolumeChart from '../src/features/metrics/components/network-volume-chart';

storiesOf('Charts|NetworkVolumeChart', module).addWithJSX('default', () => {
  const currentDate = new Date();

  const data = _.times(31, index => {
    const date = subDays(currentDate, index);
    date.setUTCHours(0, 0, 0, 0);

    return {
      date,
      fills: _.random(1, 100),
      volume: _.random(1000, 5000),
    };
  });

  return (
    <NetworkVolumeChart
      data={data}
      displayCurrency="USD"
      period={TIME_PERIOD.MONTH}
    />
  );
});

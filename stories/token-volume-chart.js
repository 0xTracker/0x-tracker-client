import _ from 'lodash';
import { storiesOf } from '@storybook/react';
import { subDays } from 'date-fns';
import React from 'react';

import { TIME_PERIOD } from '../src/constants';
import TokenVolumeChart from '../src/features/metrics/components/token-volume-chart';

storiesOf('Charts|TokenVolumeChart', module).addWithJSX('default', () => {
  const currentDate = new Date();

  const data = _.times(31, index => {
    const date = subDays(currentDate, index);
    date.setUTCHours(0, 0, 0, 0);

    return {
      date,
      tokenVolume: _.random(1, 100),
      volume: _.random(1000, 5000),
    };
  });

  return (
    <TokenVolumeChart
      data={data}
      displayCurrency="USD"
      period={TIME_PERIOD.MONTH}
      token="DAI"
    />
  );
});

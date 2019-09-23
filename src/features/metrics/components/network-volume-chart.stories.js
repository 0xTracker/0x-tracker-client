import _ from 'lodash';
import { storiesOf } from '@storybook/react';
import React from 'react';
import subDays from 'date-fns/subDays';

import { TIME_PERIOD } from '../../../constants';
import NetworkVolumeChart from './network-volume-chart';

storiesOf('Charts|NetworkVolumeChart', module)
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
  })
  .add('without any data', () => (
    <NetworkVolumeChart
      data={[]}
      displayCurrency="USD"
      period={TIME_PERIOD.MONTH}
    />
  ));

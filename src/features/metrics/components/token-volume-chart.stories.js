import _ from 'lodash';
import { storiesOf } from '@storybook/react';
import React from 'react';
import subDays from 'date-fns/subDays';

import { TIME_PERIOD } from '../../../constants';
import TokenVolumeChart from './token-volume-chart';

storiesOf('Charts|TokenVolumeChart', module)
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
        localizedVolume: _.random(1000, 5000),
        tokenVolume: _.random(1, 100),
      };
    });

    return (
      <TokenVolumeChart
        data={data}
        localCurrency="USD"
        period={TIME_PERIOD.MONTH}
        tokenSymbol="DAI"
      />
    );
  })
  .add('without any data', () => (
    <TokenVolumeChart
      data={[]}
      localCurrency="USD"
      period={TIME_PERIOD.MONTH}
      tokenSymbol="DAI"
    />
  ));

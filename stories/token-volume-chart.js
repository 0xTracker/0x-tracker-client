import { storiesOf } from '@storybook/react';
import { css, StyleSheet } from 'aphrodite';
import React from 'react';

import { TIME_PERIOD } from '../src/constants';
import TokenVolumeChart from '../src/features/metrics/components/token-volume-chart';

const styles = StyleSheet.create({
  container: {
    width: '615px',
    height: '230px',
    padding: '19px',
    margin: '30px',
  },
});

storiesOf('Charts|TokenVolumeChart', module).addWithJSX('default', () => {
  const data = [
    { date: new Date('2017-10-05'), tokenVolume: 50, volume: 50000 },
    { date: new Date('2017-10-06'), tokenVolume: 22, volume: 7676 },
    { date: new Date('2017-10-07'), tokenVolume: 12, volume: 343453 },
    { date: new Date('2017-10-08'), tokenVolume: 4, volume: 4543 },
    { date: new Date('2017-10-09'), tokenVolume: 56, volume: 434667 },
    { date: new Date('2017-10-10'), tokenVolume: 4, volume: 555667 },
    { date: new Date('2017-10-11'), tokenVolume: 9, volume: 1500 },
  ];

  return (
    <div className={css(styles.container)}>
      <TokenVolumeChart
        data={data}
        displayCurrency="USD"
        period={TIME_PERIOD.YEAR}
        token="DAI"
      />
    </div>
  );
});

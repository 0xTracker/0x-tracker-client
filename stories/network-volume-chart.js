import { storiesOf } from '@storybook/react';
import { css, StyleSheet } from 'aphrodite';
import React from 'react';

import NetworkVolumeChart from '../src/features/metrics/components/network-volume-chart';

const styles = StyleSheet.create({
  container: {
    width: '615px',
    height: '230px',
    padding: '19px',
    margin: '30px',
  },
});

storiesOf('Charts|NetworkVolumeChart', module).addWithJSX('default', () => {
  const data = [
    { date: Date.parse('2017-10-05'), fills: 10, volume: 50000 },
    { date: Date.parse('2017-10-06'), fills: 22, volume: 7676 },
    { date: Date.parse('2017-10-07'), fills: 12, volume: 343453 },
    { date: Date.parse('2017-10-08'), fills: 4, volume: 4543 },
    { date: Date.parse('2017-10-09'), fills: 56, volume: 434667 },
    { date: Date.parse('2017-10-10'), fills: 4, volume: 555667 },
    { date: Date.parse('2017-10-11'), fills: 9, volume: 1500 },
  ];

  return (
    <div className={css(styles.container)}>
      <NetworkVolumeChart data={data} displayCurrency="USD" />
    </div>
  );
});

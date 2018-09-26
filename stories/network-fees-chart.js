import { storiesOf } from '@storybook/react';
import { css, StyleSheet } from 'aphrodite';
import React from 'react';

import NetworkFeesChart from '../src/features/metrics/components/network-fees-chart';

const styles = StyleSheet.create({
  container: {
    width: '615px',
    height: '230px',
    padding: '19px',
    margin: '30px',
  },
});

storiesOf('Charts|NetworkFeesChart', module).addWithJSX('default', () => {
  const data = [
    { date: new Date('2017-10-05'), fees: '10', localizedFees: 5.6 },
    { date: new Date('2017-10-06'), fees: '200', localizedFees: 198 },
    { date: new Date('2017-10-07'), fees: '20', localizedFees: 18.8 },
    { date: new Date('2017-10-08'), fees: '22', localizedFees: 20 },
    { date: new Date('2017-10-09'), fees: '58', localizedFees: 47 },
    { date: new Date('2017-10-10'), fees: '99', localizedFees: 96.6 },
    { date: new Date('2017-10-11'), fees: '10', localizedFees: 5.6 },
  ];

  return (
    <div className={css(styles.container)}>
      <NetworkFeesChart data={data} displayCurrency="USD" />
    </div>
  );
});

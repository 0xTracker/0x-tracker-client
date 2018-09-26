import { css, StyleSheet } from 'aphrodite';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    color: '#808080',
    display: 'flex',
    flexGrow: '1',
    justifyContent: 'center',
  },
});

const EmptyChart = () => (
  <div className={css(styles.container)}>No data available</div>
);

export default EmptyChart;

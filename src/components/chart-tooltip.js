import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';
import React from 'react';

const styles = StyleSheet.create({
  itemTitle: {
    display: 'inline-block',
    fontWeight: 'normal',
  },
  itemValue: {
    display: 'inline-block',
    marginLeft: '0.25rem',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1rem',
    marginBottom: '1.2rem',
    textAlign: 'center',
  },
  wrapper: {
    backgroundColor: 'white',
    border: '1px solid #EBEBEB',
    padding: '1rem',
    textAlign: 'left',
  },
});

const ChartTooltip = ({ title, items }) => (
  <div className={css(styles.wrapper)}>
    <h1 className={css(styles.title)}>{title}</h1>
    <dl>
      {items.map(item => (
        <div key={item.label}>
          <dt className={css(styles.itemTitle)}>{item.label}:</dt>
          <dd className={css(styles.itemValue)}>{item.value}</dd>
        </div>
      ))}
    </dl>
  </div>
);

ChartTooltip.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default ChartTooltip;

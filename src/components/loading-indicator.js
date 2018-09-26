import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';
import React from 'react';
import ReactLoading from 'react-loading';

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
  },
});

const LoadingIndicator = ({ color, isCentered, size, type }) => {
  const indicator = (
    <ReactLoading
      color={color === 'light' ? '#fff' : '#333'}
      delay={0}
      height={size === 'small' ? 22 : undefined}
      type={type === 'cylon' ? 'cylon' : 'spin'}
      width={size === 'small' ? 22 : undefined}
    />
  );

  if (isCentered) {
    return <div className={css(styles.wrapper)}>{indicator}</div>;
  }

  return indicator;
};

LoadingIndicator.propTypes = {
  color: PropTypes.oneOf(['light', 'dark']),
  size: PropTypes.oneOf(['small', 'large']),
  type: PropTypes.oneOf(['cylon', 'spinner']),
};

LoadingIndicator.defaultProps = {
  color: 'dark',
  size: 'large',
  type: 'spinner',
};

export default LoadingIndicator;

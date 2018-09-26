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

const Spinner = ({ isCentered }) => {
  const spinner = (
    <ReactLoading className="spinner" color="#333" delay={0} type="spin" />
  );

  if (isCentered) {
    return <div className={css(styles.wrapper)}>{spinner}</div>;
  }

  return spinner;
};

Spinner.propTypes = {
  isCentered: PropTypes.bool,
};

Spinner.defaultProps = {
  isCentered: false,
};

export default Spinner;

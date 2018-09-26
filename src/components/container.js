import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';
import React from 'react';

const baseStyles = StyleSheet.create({
  container: {
    maxWidth: '1170px',
  },
});

const Container = ({ children, styles }) => (
  <div className={`${css(baseStyles.container, styles)} container-fluid`}>
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
  styles: PropTypes.any,
};

Container.defaultProps = {
  styles: undefined,
};

export default Container;

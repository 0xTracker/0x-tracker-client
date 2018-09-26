import { StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';
import React from 'react';

import Container from './container';

const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: '40px',
    paddingTop: '40px',
  },
  fullWidth: {
    margin: '0',
    maxWidth: '100%',
  },
  verticallyCentered: {
    display: 'flex',
    alignItems: 'center',
  },
});

const ContentSection = ({
  children,
  fullWidth,
  styles,
  verticallyCentered,
}) => (
  <Container
    styles={[
      baseStyles.container,
      verticallyCentered && baseStyles.verticallyCentered,
      fullWidth && baseStyles.fullWidth,
      styles,
    ]}
  >
    {children}
  </Container>
);

ContentSection.propTypes = {
  children: PropTypes.node.isRequired,
  fullWidth: PropTypes.bool,
  styles: PropTypes.any,
  verticallyCentered: PropTypes.bool,
};

ContentSection.defaultProps = {
  fullWidth: false,
  styles: undefined,
  verticallyCentered: false,
};

export default ContentSection;

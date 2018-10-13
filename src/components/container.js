import { Container as BootstrapContainer } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled(BootstrapContainer).attrs({ fluid: true })`
  max-width: 1170px;
`;

const Container = ({ children, className }) => (
  <StyledContainer className={className}>{children}</StyledContainer>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Container.defaultProps = {
  className: undefined,
};

export default Container;

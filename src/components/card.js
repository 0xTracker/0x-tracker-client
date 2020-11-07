import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import CardErrorBoundary from './card-error-boundary';

const Wrapper = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 1px 3px rgba(126, 142, 177, 0.2);
  display: flex;
  flex-direction: column;
  flex-grow: ${(props) => (props.autoHeight ? '1' : '0')};
`;

const Card = ({ children, errorMessage, ...otherProps }) => (
  <Wrapper {...otherProps}>
    <CardErrorBoundary message={errorMessage}>{children}</CardErrorBoundary>
  </Wrapper>
);

Card.defaultProps = {
  autoHeight: true,
  errorMessage: undefined,
};

Card.propTypes = {
  autoHeight: PropTypes.bool,
  children: PropTypes.node.isRequired,
  errorMessage: PropTypes.string,
};

export default Card;

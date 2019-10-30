import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';

const StyledCard = styled.div`
  background-color: ${colors.white};
  border: none;
  border-radius: 0.25rem;
  box-shadow: 0px 2px 4px rgba(126, 142, 177, 0.12);
  display: flex;
  flex-direction: column;
  flex-grow: ${props => (props.fullHeight ? '1' : '0')};
  overflow: hidden;
`;

const BasicCard = ({ children, className, fullHeight }) => (
  <StyledCard className={className} fullHeight={fullHeight}>
    {children}
  </StyledCard>
);

BasicCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  fullHeight: PropTypes.bool,
};

BasicCard.defaultProps = {
  className: undefined,
  fullHeight: false,
};

export default BasicCard;

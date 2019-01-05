import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import CardHeader from './card-header';
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

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: ${props => (props.padded ? '1rem' : 0)};
`;

const Card = ({ children, className, fullHeight, header, padded }) => (
  <StyledCard className={className} fullHeight={fullHeight}>
    {header ? <CardHeader>{header}</CardHeader> : null}
    <CardBody padded={padded}>{children}</CardBody>
  </StyledCard>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  fullHeight: PropTypes.bool,
  header: PropTypes.node,
  padded: PropTypes.bool,
};

Card.defaultProps = {
  className: undefined,
  fullHeight: false,
  header: undefined,
  padded: false,
};

export default Card;

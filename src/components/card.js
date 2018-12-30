import { Card as BaseCard } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import CardHeader from './card-header';

const StyledCard = styled(BaseCard)`
  border: none;
  box-shadow: 0px 2px 4px rgba(126, 142, 177, 0.12);
  overflow: hidden;
`;

const Card = ({ children, className, header, padded }) => (
  <StyledCard className={className}>
    {header ? <CardHeader>{header}</CardHeader> : null}
    {padded ? <div css="padding: 1em;">{children}</div> : children}
  </StyledCard>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  header: PropTypes.node,
  padded: PropTypes.bool,
};

Card.defaultProps = {
  className: undefined,
  header: undefined,
  padded: false,
};

export default Card;

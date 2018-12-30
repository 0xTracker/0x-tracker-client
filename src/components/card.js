import { Card as BaseCard } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledCard = styled(BaseCard)`
  border-radius: none;
  border: none;
  box-shadow: 0px 2px 4px rgba(126, 142, 177, 0.12);
  overflow: hidden;
`;

const CardHeading = styled.h2`
  font-size: 1.3em;
  margin: 0 0 0.5em 0;
  padding: 16px;
`;

const Card = ({ children, className, heading, padded }) => (
  <StyledCard className={className}>
    {heading ? <CardHeading>{heading}</CardHeading> : null}
    {padded ? <div css="padding: 1em;">{children}</div> : children}
  </StyledCard>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  heading: PropTypes.string,
  padded: PropTypes.bool,
};

Card.defaultProps = {
  className: undefined,
  heading: undefined,
  padded: false,
};

export default Card;

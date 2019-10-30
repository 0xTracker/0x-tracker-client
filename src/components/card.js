import PropTypes from 'prop-types';
import React from 'react';

import BasicCard from './basic-card';
import CardBody from './card-body';
import CardHeader from './card-header';

const Card = ({ children, className, fullHeight, header, padded }) => (
  <BasicCard className={className} fullHeight={fullHeight}>
    {header ? <CardHeader>{header}</CardHeader> : null}
    <CardBody padded={padded}>{children}</CardBody>
  </BasicCard>
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

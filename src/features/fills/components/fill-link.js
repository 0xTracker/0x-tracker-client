import PropTypes from 'prop-types';
import React from 'react';

import buildFillUrl from '../util/build-fill-url';
import Link from '../../../components/link';

const FillLink = ({ children, className, fillId }) => (
  <Link className={className} href={buildFillUrl(fillId)}>
    {children}
  </Link>
);

FillLink.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  fillId: PropTypes.string.isRequired,
};

FillLink.defaultProps = {
  className: undefined,
};

export default FillLink;

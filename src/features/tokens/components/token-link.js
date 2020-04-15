import PropTypes from 'prop-types';
import React from 'react';

import buildTokenUrl from '../util/build-token-url';
import Link from '../../../components/link';

const TokenLink = ({ address, children, className, params }) => (
  <Link className={className} href={buildTokenUrl(address, params)}>
    {children}
  </Link>
);

TokenLink.propTypes = {
  address: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  params: PropTypes.object,
};

TokenLink.defaultProps = {
  address: undefined,
  children: undefined,
  className: undefined,
  params: undefined,
};

export default TokenLink;
